import { ProgressSpinner } from 'primereact/progressspinner'
import { useSelector } from 'react-redux'
import { RootState } from '../../Stores/store'
import { SpinnerParams } from './SpinnerParams'
import { selectSpinner } from '../../Stores/slices/spinnerSlice'

const Spinner = () => {
  const params = useSelector<RootState, SpinnerParams>(selectSpinner)

  return (
    <>
      {params.isActive && (
        <div className="card flex justify-content-center spinner">
          <ProgressSpinner />
        </div>
      )}
    </>
  )
}

export default Spinner
