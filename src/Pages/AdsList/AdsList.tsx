import { Button } from 'primereact/button'
import { DataView } from 'primereact/dataview'
import { classNames } from 'primereact/utils'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAds, selectAds } from '../../Stores/slices/adsSlice'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { AppDispatch } from '../../Stores/store'

export default function AdsList() {
  const dispatch = useDispatch<AppDispatch>()
  const ads = useSelector(selectAds)

  useEffect(() => {
    dispatch(showSpinner())
    dispatch(fetchAds(import.meta.env.VITE_API_URL)).finally(() =>
      dispatch(hideSpinner())
    )
  }, [dispatch])

  const itemTemplate = (ad, index) => {
    return (
      <div className="col-12" key={ad.id}>
        <div
          className={classNames(
            'flex flex-column xl:flex-row xl:align-items-start p-4 gap-4',
            { 'border-top-1 surface-border': index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={ad.image}
            alt={ad.name}
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
              <Button label="Открыть" className="p-button-rounded"></Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const listTemplate = (items: Ad) => {
    if (!items || items.length === 0) return null

    let list = items.map((product, index) => {
      return itemTemplate(product, index)
    })

    return <div className="grid grid-nogutter">{list}</div>
  }

  return (
    <div className="card">
      {ads && (
        <DataView
          value={ads.ads}
          listTemplate={listTemplate}
          paginator
          emptyMessage="Не найдено ни одного объявления"
          rows={5}
        />
      )}
    </div>
  )
}
