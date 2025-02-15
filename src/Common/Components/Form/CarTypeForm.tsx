import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { ServiceTypeFormProps } from '../../Models/TypeFormProps'

const CarTypeForm = ({ handleChange, formValue }: ServiceTypeFormProps) => {
  const brandType = ['Audi', 'Skoda', 'Mercedes', 'Mazda', 'BMW', 'Porsche']

  return (
    <>
      <Dropdown
        id="brand"
        inputId="brand"
        value={formValue?.brand}
        onChange={(e) => {
          handleChange(e)
        }}
        options={brandType}
        optionLabel="brand"
        placeholder="Марка"
        className="w-full"
      />
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          keyfilter={/^[a-zA-Z0-9.\\-]+(?: [a-zA-Z0-9.\\-]+)*$/i}
          id="model"
          value={formValue?.model}
          onChange={handleChange}
        />
        <label htmlFor="model">Модель</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          keyfilter="pnum"
          className="w-full"
          id="year"
          value={formValue?.year}
          maxLength={4}
          onChange={handleChange}
        />
        <label htmlFor="year">Год выпуска</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          keyfilter="pnum"
          className="w-full"
          id="mileage"
          maxLength={7}
          value={formValue?.mileage}
          onChange={handleChange}
        />
        <label htmlFor="mileage">Пробег (км)</label>
      </FloatLabel>
    </>
  )
}

export default CarTypeForm
