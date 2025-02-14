import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { ServiceTypeFormProps } from '../../Models/TypeFormProps'

const CarTypeForm = ({ handleChange, formValue }: ServiceTypeFormProps) => {
  return (
    <>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="brand"
          value={formValue?.brand}
          onChange={handleChange}
        />
        <label htmlFor="brand">Марка</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="model"
          value={formValue?.model}
          onChange={handleChange}
        />
        <label htmlFor="model">Модель</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="year"
          value={formValue?.year}
          onChange={handleChange}
        />
        <label htmlFor="year">Год выпуска</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="mileage"
          value={formValue?.mileage}
          onChange={handleChange}
        />
        <label htmlFor="mileage">Пробег</label>
      </FloatLabel>
    </>
  )
}

export default CarTypeForm
