import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { MenuItem } from 'primereact/menuitem'
import { Steps } from 'primereact/steps'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CarTypeForm from '../../Common/Components/TypeForm/CarTypeForm'
import RealtyTypeForm from '../../Common/Components/TypeForm/RealtyTypeForm'
import ServiceTypeForm from '../../Common/Components/TypeForm/ServiceTypeForm'
import { AdParams } from '../../Common/Models/AdParams'
import { AdType } from '../../Common/Models/AdType'
import { CarAd } from '../../Common/Models/CarAd'
import { RealtyAd } from '../../Common/Models/RealtyAd'
import { selectedType } from '../../Common/Models/SelectedType'
import { ServicesAd } from '../../Common/Models/ServicesAd'
import { postAd } from '../../Stores/slices/adsSlice'
import { selectMode } from '../../Stores/slices/selectedAdSlice'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'
import './AdsForm.scss'

const AdsForm = () => {
  const navigate = useNavigate()
  const selectedAd = useSelector(selectMode)
  const dispatch = useDispatch<AppDispatch>()
  const url = import.meta.env.VITE_API_URL

  const [activeStep, setActiveStep] = useState<number>(0)

  const [mainFormValue, setMainFormValue] = useState<Omit<
    AdParams,
    'id'
  > | null>(null)
  const [secondFormValue, setSecondFormValue] = useState<
    CarAd | ServicesAd | RealtyAd | null
  >(null)

  const [selectedType, setSelectedType] = useState<selectedType | null>(null)

  const adType = [
    { type: 'Недвижимость' },
    { type: 'Авто' },
    { type: 'Услуги' },
  ]

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

  const handleChangeSecondForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setSecondFormValue((prevValues) => ({
      ...prevValues,
      [id]: value,
    }))
  }

  const handleClickNextButton = () => {
    if (
      !mainFormValue?.name.trim() ||
      !mainFormValue?.description.trim() ||
      !mainFormValue?.location.trim()
    ) {
      dispatch(
        setToast({
          type: 'warn',
          message:
            'Все поля (кроме "Ссылка на изображение") обязательны для заполнения',
        })
      )
    } else if (activeStep === 0 && selectedType) setActiveStep(1)
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
    dispatch(showSpinner())
    dispatch(
      postAd({
        url,
        ad: {
          ...mainFormValue,
          type: selectedType?.type as AdType,
          ...secondFormValue,
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
      .finally(() => dispatch(hideSpinner()))
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
          <>
            <FloatLabel>
              <InputText
                autoComplete="off"
                className="w-full"
                id="name"
                value={mainFormValue?.name}
                onChange={handleChangeMainForm}
              />
              <label htmlFor="name">Название</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                autoComplete="off"
                className="w-full"
                id="description"
                value={mainFormValue?.description}
                onChange={handleChangeMainForm}
              />
              <label htmlFor="description">Описание</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                autoComplete="off"
                className="w-full"
                id="location"
                value={mainFormValue?.location}
                onChange={handleChangeMainForm}
              />
              <label htmlFor="location">Местоположение</label>
            </FloatLabel>
            <FloatLabel className="w-full">
              <InputText
                autoComplete="off"
                className="w-full"
                id="image"
                value={mainFormValue?.image}
                onChange={handleChangeMainForm}
              />
              <label htmlFor="image">Ссылка на изображение</label>
            </FloatLabel>
            <FloatLabel className="w-full">
              <Dropdown
                inputId="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.value)}
                options={adType}
                optionLabel="type"
                className="w-full"
              />
              <label htmlFor="type">Тип объявления</label>
            </FloatLabel>
          </>
        )}
        {activeStep === 1 &&
          (selectedType?.type === 'Недвижимость' ? (
            <RealtyTypeForm
              handleChange={handleChangeSecondForm}
              formValue={secondFormValue}
            />
          ) : selectedType?.type === 'Авто' ? (
            <CarTypeForm
              handleChange={handleChangeSecondForm}
              formValue={secondFormValue}
            />
          ) : (
            <ServiceTypeForm
              handleChange={handleChangeSecondForm}
              formValue={secondFormValue}
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
