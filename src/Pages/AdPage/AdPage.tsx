import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AdParams } from '../../Common/Models/AdParams'
import { selectAds } from '../../Stores/slices/adsSlice'
import { fetchSelectedAd } from '../../Stores/slices/selectedAdSlice'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { AppDispatch } from '../../Stores/store'
import './AdPage.scss'

const Ad = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const params = useParams()
  const ads = useSelector(selectAds)
  const adList: AdParams[] = ads
  const url = import.meta.env.VITE_API_URL

  const ad: AdParams | undefined = adList.find(
    (adItem: AdParams) => adItem.id === Number(params.id)
  )

  const linkTo = useCallback(
    (url: string): void => {
      navigate(url, { relative: 'path' })
    },
    [navigate]
  )

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

  useEffect(() => {
    if (!ad) {
      linkTo('/list')
    }
  }, [navigate, ad, linkTo])

  if (!adList) {
    return <div>Loading...</div>
  }

  if (!ad) {
    return <div>Ad not found</div>
  }

  return (
    <div>
      <Button
        label="К списку объявлений"
        onClick={() => linkTo('/list')}
      ></Button>
      <h2>{ad.name}</h2>
      {/* <img
        src={ad.image ? ad.image : '/img/no-image.png'}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src = '/img/no-image.png'
        }}
        alt="productImage"
        width={160}
        height={107}
      /> */}
      <Image
        src={ad.image ? ad.image : '/img/no-image.png'}
        onError={({ currentTarget }) => {
          currentTarget.src = '/img/no-image.png'
        }}
        alt="productImage"
        width="160"
        preview
      />
      <p>{ad.description}</p>
      <h3>Категория: {ad.type}</h3>
      {ad.type === 'Недвижимость' && (
        <div>
          <p>{`Тип недвижимости: ${ad.propertyType}`}</p>
          <p>{`Площадь: ${ad.area} м`}&sup2;</p>
          <p>{`Комнат: ${ad.rooms}`}</p>
          <p>{`Стоимость: ${ad.price} `}&#8381;</p>
        </div>
      )}
      {ad.type === 'Авто' && (
        <div>
          <p>{`Марка: ${ad.brand}`}</p>
          <p>{`Модель: ${ad.model}`}</p>
          <p>{`Год выпуска: ${ad.year}`} г.</p>
          {ad.mileage && <p>{`Пробег: ${ad.mileage} км`}</p>}
        </div>
      )}
      {ad.type === 'Услуги' && (
        <div>
          <p>{`Вид услуги: ${ad.serviceType}`}</p>
          <p>{`Опыт: ${ad.experience} лет`}</p>
          <p>{`Стоимость услуги: ${ad.cost} `}&#8381;</p>
          {ad.workSchedule && <p>{`Время работы: ${ad.workSchedule}`}</p>}
        </div>
      )}

      <div className="controls">
        <Button label="Редактировать" onClick={toEdit}></Button>
      </div>
    </div>
  )
}

export default Ad
