import { Button } from 'primereact/button'
import { DataView } from 'primereact/dataview'
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AdParams } from '../../Common/Models/AdParams'
import { fetchAds, selectAds } from '../../Stores/slices/adsSlice'
import { selectedAdActions } from '../../Stores/slices/selectedAdSlice'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { AppDispatch } from '../../Stores/store'
import './AdsListPage.scss'

export default function AdsList() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const ads = useSelector(selectAds)
  const url = import.meta.env.VITE_API_URL

  useEffect(() => {
    dispatch(showSpinner())
    dispatch(fetchAds(url)).finally(() => dispatch(hideSpinner()))
  }, [dispatch, url])

  const itemTemplate = (ad: AdParams, index: number) => {
    return (
      <div className="col-12" key={ad.id}>
        <div
          className={classNames(
            'flex flex-column xl:flex-row xl:align-items-start p-4 gap-4',
            { 'border-top-1 surface-border': index !== 0 }
          )}
        >
          <Image
            src={ad.image ? ad.image : '/img/no-image.png'}
            onError={({ currentTarget }) => {
              currentTarget.src = '/img/no-image.png'
            }}
            alt={ad.name}
            width="160"
            preview
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-end flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{ad.name}</div>
              <div className="text-700">{ad.location}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{ad.type}</span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Button
                label="Открыть"
                className="p-button-rounded"
                onClick={() => navigate(`/item/${ad.id}`)}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const listTemplate = (items: AdParams[]) => {
    if (!items || items.length === 0) return null

    const list = items.map((ad, index) => {
      return itemTemplate(ad, index)
    })

    return <div className="grid grid-nogutter">{list}</div>
  }

  return (
    <div className="card">
      <div className="card-actions">
        <InputText placeholder="Поиск"></InputText>
        <Button
          label="Разместить объявление"
          onClick={() => {
            dispatch(selectedAdActions.changeMode('create'))
            navigate('/form', { relative: 'path' })
          }}
        ></Button>
      </div>
      {ads && (
        <DataView
          value={ads}
          listTemplate={listTemplate}
          paginator
          emptyMessage="Список объявлений пуст"
          rows={5}
        />
      )}
    </div>
  )
}
