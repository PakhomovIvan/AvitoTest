import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { ServiceTypeFormProps } from '../../Models/TypeFormProps'

const RealtyTypeForm = ({ handleChange, formValue }: ServiceTypeFormProps) => {
  return (
    <>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="propertyType"
          value={formValue?.propertyType}
          onChange={handleChange}
        />
        <label htmlFor="propertyType">Категория</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="area"
          value={formValue?.area}
          onChange={handleChange}
        />
        <label htmlFor="area">Площадь</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="rooms"
          value={formValue?.rooms}
          onChange={handleChange}
        />
        <label htmlFor="rooms">Количество комнат</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="price"
          value={formValue?.price}
          onChange={handleChange}
        />
        <label htmlFor="price">Стоимость</label>
      </FloatLabel>
    </>
  )
}

export default RealtyTypeForm
