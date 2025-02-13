import { Button } from 'primereact/button'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectMode } from '../../Stores/slices/selectedAdSlice'

const AdsForm = () => {
  const navigate = useNavigate()
  const selectedAd = useSelector(selectMode)

  return (
    <>
      {String(selectedAd) === 'edit' ? (
        <h1>Редактирование объявления</h1>
      ) : (
        <h1>Создание объявления</h1>
      )}

      <Button label="Назад" onClick={() => navigate(-1)}></Button>
    </>
  )
}

export default AdsForm
