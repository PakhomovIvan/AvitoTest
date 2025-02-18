import { Button } from 'primereact/button'
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup'
import { MenuItem } from 'primereact/menuitem'
import { Steps } from 'primereact/steps'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CarTypeForm from '../../Common/Components/Forms/CarTypeForm'
import MainForm from '../../Common/Components/Forms/MainForm'
import RealtyTypeForm from '../../Common/Components/Forms/RealtyTypeForm'
import ServiceTypeForm from '../../Common/Components/Forms/ServiceTypeForm'
import { AdParams } from '../../Common/Models/AdParams'
import { CarAd } from '../../Common/Models/TypeModels/CarAd'
import { RealtyAd } from '../../Common/Models/TypeModels/RealtyAd'
import { ServicesAd } from '../../Common/Models/TypeModels/ServicesAd'
import { deleteAd, fetchAds, postAd, putAd } from '../../Stores/slices/adsSlice'
import {
  selectMode,
  selectSelectedAd,
} from '../../Stores/slices/selectedAdSlice'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'
import styles from './FormPage..module.scss'

const AdsForm = () => {
  const url = import.meta.env.VITE_API_URL

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const selectedAd = useSelector(selectSelectedAd)
  const selectedAdMode = useSelector(selectMode)

  const confirmPopupRef = useRef(null)

  const [activeStep, setActiveStep] = useState<number>(0)
  const [mainFormValue, setMainFormValue] = useState<
    Omit<AdParams, 'id'> | null | object
  >({
    name: '',
    description: '',
    location: '',
    type: '',
    image: '',
  })
  const [additionalFormValue, setAdditionalFormValue] = useState<
    CarAd | ServicesAd | RealtyAd | null | object
  >(null)

  const items: MenuItem[] = [
    {
      label: '',
    },
    {
      label: '',
    },
  ]

  useEffect(() => {
    if (selectedAd && String(selectedAdMode) === 'edit') {
      setMainFormValue({
        name: selectedAd?.name,
        description: selectedAd?.description,
        location: selectedAd?.location,
        type: selectedAd?.type,
        image: selectedAd?.image,
      })

      const additionProperty = ({
        id,
        name,
        description,
        location,
        type,
        image,
        ...selectedAd
      }: AdParams) => selectedAd

      const spreadAdditionProperty = additionProperty(selectedAd)

      setAdditionalFormValue({ ...spreadAdditionProperty })
    }
  }, [selectedAd, selectedAdMode])

  const handleChangeMainForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setMainFormValue((prevValues) => ({
      ...prevValues,
      [id]: value,
    }))
  }

  const handleChangeAdditionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setAdditionalFormValue((prevValues) => ({
      ...prevValues,
      [id]: value,
    }))
  }

  const handleClickNextButton = () => {
    if (
      !mainFormValue?.name ||
      !mainFormValue?.description ||
      !mainFormValue?.location
    ) {
      dispatch(
        setToast({
          type: 'warn',
          message:
            'Все поля обязательны для заполнения (кроме "Ссылка на изображение")',
        })
      )
    } else if (activeStep === 0 && mainFormValue?.type) setActiveStep(1)
    else {
      dispatch(
        setToast({
          type: 'warn',
          message: 'Выберите тип объявления',
        })
      )
    }
  }

  const accept = (id: number) => {
    dispatch(showSpinner())
    dispatch(deleteAd(id))
      .unwrap()
      .then(() => {
        dispatch(fetchAds(import.meta.env.VITE_API_URL))
        dispatch(
          setToast({
            type: 'success',
            message: 'Объявление удалено',
          })
        )
      })
      .catch(() =>
        dispatch(
          setToast({
            type: 'error',
            message: 'Объявление не было удалено',
          })
        )
      )
      .finally(() => {
        dispatch(hideSpinner())
        navigate('/list')
      })
  }

  const handleSubmit = () => {
    if (
      mainFormValue?.type === 'Авто' &&
      (!additionalFormValue?.brand ||
        !additionalFormValue?.model ||
        !additionalFormValue?.year ||
        !additionalFormValue?.mileage)
    ) {
      dispatch(
        setToast({
          type: 'warn',
          message: 'Все поля обязательны для заполнения (кроме "Пробег") ',
        })
      )
    } else if (
      mainFormValue?.type === 'Услуги' &&
      (!additionalFormValue?.serviceType ||
        !additionalFormValue?.experience ||
        !additionalFormValue?.cost ||
        !additionalFormValue?.workSchedule)
    ) {
      dispatch(
        setToast({
          type: 'warn',
          message:
            'Все поля обязательны для заполнения (кроме "Время работы") ',
        })
      )
    } else if (
      mainFormValue?.type === 'Недвижимость' &&
      (!additionalFormValue?.propertyType ||
        !additionalFormValue?.area ||
        !additionalFormValue?.rooms ||
        !additionalFormValue?.price)
    ) {
      dispatch(
        setToast({
          type: 'warn',
          message: 'Все поля обязательны для заполнения',
        })
      )
    } else if (selectedAd && String(selectedAdMode) === 'edit') {
      const combinedFormValues = {
        ...mainFormValue,
        ...additionalFormValue,
        id: selectedAd.id,
      }

      dispatch(showSpinner())
      dispatch(
        putAd({
          id: selectedAd.id,
          ad: combinedFormValues as AdParams,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            setToast({
              type: 'success',
              message: 'Объявление обновлено',
            })
          )
          navigate('/list')
        })
        .catch(() =>
          dispatch(
            setToast({
              type: 'error',
              message: 'Объявление не обновлено',
            })
          )
        )
        .finally(() => {
          dispatch(hideSpinner())
          setMainFormValue(null)
          setAdditionalFormValue(null)
        })
    } else {
      dispatch(showSpinner())
      dispatch(
        postAd({
          url,
          ad: {
            ...mainFormValue,
            ...additionalFormValue,
          },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            setToast({
              type: 'success',
              message: 'Объявление опубликовано',
            })
          )
          navigate('/')
        })
        .catch(() =>
          dispatch(
            setToast({
              type: 'error',
              message: 'Объявление не опубликовано',
            })
          )
        )
        .finally(() => {
          dispatch(hideSpinner())
          setMainFormValue(null)
          setAdditionalFormValue(null)
        })
    }
  }

  const showPopap = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    confirmPopup({
      target: event.currentTarget,
      message: <span>Вы действительно хотите удалить объявление?</span>,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check',
      acceptLabel: 'Да',
      rejectIcon: 'pi pi-times',
      rejectLabel: 'Нет',
      accept: () => accept(id),
    })
  }

  return (
    <div className={styles['form-wrapper']}>
      {String(selectedAdMode) === 'edit' ? (
        <h1>Редактирование объявления</h1>
      ) : (
        <h1>Создание объявления</h1>
      )}

      <form className={styles['ad-form']}>
        {activeStep === 0 && (
          <MainForm
            handleChange={handleChangeMainForm}
            formValue={mainFormValue}
            setAdditionalFormValue={setAdditionalFormValue}
          />
        )}
        {activeStep === 1 &&
          (mainFormValue?.type === 'Недвижимость' ? (
            <RealtyTypeForm
              handleChange={handleChangeAdditionForm}
              formValue={additionalFormValue}
            />
          ) : mainFormValue?.type === 'Авто' ? (
            <CarTypeForm
              handleChange={handleChangeAdditionForm}
              formValue={additionalFormValue}
            />
          ) : (
            <ServiceTypeForm
              handleChange={handleChangeAdditionForm}
              formValue={additionalFormValue}
            />
          ))}
      </form>
      <Steps
        model={items}
        activeIndex={activeStep}
        className={styles['steps-panel']}
      />
      <div className={styles['form-controls']}>
        <ConfirmPopup ref={confirmPopupRef} />
        <Button
          label="Назад"
          onClick={() => (activeStep === 0 ? navigate(-1) : setActiveStep(0))}
        ></Button>
        {selectedAd && String(selectedAdMode) === 'edit' && (
          <Button
            label="Удалить"
            severity="danger"
            onClick={(e) => showPopap(e, selectedAd.id)}
          ></Button>
        )}
        <Button
          label={activeStep === 0 ? 'Далее' : 'Сохранить'}
          severity={activeStep === 0 ? undefined : 'success'}
          onClick={activeStep === 0 ? handleClickNextButton : handleSubmit}
        ></Button>
      </div>
    </div>
  )
}

export default AdsForm
