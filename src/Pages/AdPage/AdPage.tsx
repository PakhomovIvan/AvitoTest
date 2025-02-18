import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchSelectedAd } from '../../Stores/slices/selectedAdSlice'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { AppDispatch } from '../../Stores/store'
import './AdPage.scss'

const Ad = () => {
  const url = import.meta.env.VITE_API_URL

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const params = useParams()
  const [selectedAd, setSelectedAd] = useState()

  const linkTo = useCallback(
    (url: string): void => {
      navigate(url, { relative: 'path' })
    },
    [navigate]
  )

  useEffect(() => {
    dispatch(showSpinner())
    dispatch(
      fetchSelectedAd({
        url,
        id: Number(params.id),
      })
    )
      .unwrap()
      .then((e) => setSelectedAd(e))
      .catch(() => linkTo('/list'))
      .finally(() => dispatch(hideSpinner()))
  }, [dispatch, linkTo, params.id, url])

  const toEdit = () => {
    dispatch(showSpinner())
    dispatch(
      fetchSelectedAd({
        url,
        id: Number(params.id),
      })
    )
      .unwrap()
      .then(() => linkTo('/form'))
      .finally(() => dispatch(hideSpinner()))
  }

  return (
    <>
      {selectedAd && (
        <div className="ad-wrapper">
          <div>
            <h1>{selectedAd.name}</h1>
            <p>{selectedAd.description}</p>
          </div>
          <div className="ad-list">
            <Image
              src={selectedAd.image ? selectedAd.image : '/img/no-image.png'}
              onError={({ currentTarget }) => {
                currentTarget.src = '/img/no-image.png'
              }}
              alt="productImage"
              width="230"
              preview
            />
            <div className="ad-info">
              <h3>{selectedAd.type}</h3>
              {selectedAd.type === 'Недвижимость' && (
                <div>
                  <p>{`Тип: ${selectedAd.propertyType}`}</p>
                  <p>{`Площадь: ${selectedAd.area} м`}&sup2;</p>
                  <p>{`Комнат: ${selectedAd.rooms}`}</p>
                  <p>{`Стоимость: ${selectedAd.price} `}&#8381;</p>
                </div>
              )}
              {selectedAd.type === 'Авто' && (
                <div>
                  <p>{`Марка: ${selectedAd.brand}`}</p>
                  <p>{`Модель: ${selectedAd.model}`}</p>
                  <p>{`Год выпуска: ${selectedAd.year}`} г.</p>
                  {selectedAd.mileage && (
                    <p>{`Пробег: ${selectedAd.mileage} км`}</p>
                  )}
                </div>
              )}
              {selectedAd.type === 'Услуги' && (
                <div>
                  <p>{`Вид услуги: ${selectedAd.serviceType}`}</p>
                  <p>{`Опыт: ${selectedAd.experience} лет`}</p>
                  <p>{`Стоимость услуги: ${selectedAd.cost} `}&#8381;</p>
                  {selectedAd.workSchedule && (
                    <p>{`Время работы: ${selectedAd.workSchedule}`}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="controls">
            <Button
              label="К списку объявлений"
              onClick={() => linkTo('/list')}
            ></Button>
            <Button label="Редактировать" onClick={toEdit}></Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Ad
