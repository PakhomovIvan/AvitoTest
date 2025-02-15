import { Button } from 'primereact/button'
import { MenuItem } from 'primereact/menuitem'
import { Steps } from 'primereact/steps'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CarTypeForm from '../../Common/Components/Form/CarTypeForm'
import MainForm from '../../Common/Components/Form/MainForm'
import RealtyTypeForm from '../../Common/Components/Form/RealtyTypeForm'
import ServiceTypeForm from '../../Common/Components/Form/ServiceTypeForm'
import { AdParams } from '../../Common/Models/AdParams'
import { CarAd } from '../../Common/Models/CarAd'
import { RealtyAd } from '../../Common/Models/RealtyAd'
import { ServicesAd } from '../../Common/Models/ServicesAd'
import { postAd } from '../../Stores/slices/adsSlice'
import { selectMode } from '../../Stores/slices/selectedAdSlice'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'
import './AdsForm.scss'

const AdsForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const selectedAd = useSelector(selectMode)

  const url = import.meta.env.VITE_API_URL

  const [activeStep, setActiveStep] = useState<number>(0)
  const [mainFormValue, setMainFormValue] = useState<Omit<
    AdParams,
    'id'
  > | null>(null)
  const [additionalFormValue, setAdditionalFormValue] = useState<
    CarAd | ServicesAd | RealtyAd | null
  >(null)

  const items: MenuItem[] = [
    {
      label: '',
    },
    {
      label: '',
    },
  ]

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
      (additionalFormValue?.serviceType ||
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

  return (
    <div className="form-wrapper">
      {String(selectedAd) === 'edit' ? (
        <h1>Редактирование объявления</h1>
      ) : (
        <h1>Создание объявления</h1>
      )}

      <form className="ad-form">
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
      <Steps model={items} activeIndex={activeStep} className="steps-panel" />
      <div className="form-controls">
        <Button
          label="Назад"
          onClick={() => (activeStep === 0 ? navigate(-1) : setActiveStep(0))}
        ></Button>
        <Button
          label={activeStep === 0 ? 'Далее' : 'Сохранить'}
          onClick={activeStep === 0 ? handleClickNextButton : handleSubmit}
        ></Button>
      </div>
    </div>
  )
}

export default AdsForm
