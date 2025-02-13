import { ProgressSpinner } from 'primereact/progressspinner'
import { useSelector } from 'react-redux'
import { selectSpinner } from '../../Stores/slices/spinnerSlice'
import { RootState } from '../../Stores/store'
import { SpinnerParams } from './SpinnerParams'

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
