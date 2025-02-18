import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { ServiceTypeFormProps } from '../../Models/TypeFormProps'

const RealtyTypeForm = ({ handleChange, formValue }: ServiceTypeFormProps) => {
  const realtyType = ['Квартира', 'Дом', 'Участок', 'Коттедж', 'Гараж']

  return (
    <>
      <FloatLabel>
        <Dropdown
          id="propertyType"
          inputId="propertyType"
          value={formValue?.propertyType}
          onChange={(e) => {
            handleChange(e)
          }}
          options={realtyType}
          optionLabel="propertyType"
          placeholder="Тип недвижимости"
          className="w-full"
        />
        <label htmlFor="propertyType">Тип недвижимости</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          keyfilter="pnum"
          className="w-full"
          id="area"
          maxLength={10}
          value={formValue?.area}
          onChange={handleChange}
        />
        <label htmlFor="area">Площадь (м&sup2;)</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          keyfilter="pnum"
          className="w-full"
          id="rooms"
          maxLength={2}
          value={formValue?.rooms}
          onChange={handleChange}
        />
        <label htmlFor="rooms">Количество комнат</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          keyfilter="pnum"
          className="w-full"
          id="price"
          maxLength={11}
          value={formValue?.price}
          onChange={handleChange}
        />
        <label htmlFor="price">Стоимость (&#8381;)</label>
      </FloatLabel>
    </>
  )
}

export default RealtyTypeForm
