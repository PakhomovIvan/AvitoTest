import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { ServiceTypeFormProps } from '../../Models/TypeFormProps'

const ServiceTypeForm = ({ handleChange, formValue }: ServiceTypeFormProps) => {
  const service = ['Ремонт', 'Уборка', 'Доставка', 'Химчистка', 'ИТ-Помощь']

  return (
    <>
      <Dropdown
        id="serviceType"
        inputId="serviceType"
        value={formValue?.serviceType}
        onChange={(e) => {
          handleChange(e)
        }}
        options={service}
        optionLabel="serviceType"
        placeholder="Тип услуги"
        className="w-full"
      />
      <FloatLabel>
        <InputText
          autoComplete="off"
          keyfilter="pnum"
          className="w-full"
          id="experience"
          value={formValue?.experience}
          onChange={handleChange}
        />
        <label htmlFor="experience">Опыт (лет)</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          className="w-full"
          keyfilter="pnum"
          maxLength={11}
          autoComplete="off"
          id="cost"
          value={formValue?.cost}
          onChange={handleChange}
        />
        <label htmlFor="cost">Стоимость услуги (&#8381;)</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          keyfilter={/^[а-яА-ЯёЁ0-9\s\-:,]+$/}
          id="workSchedule"
          value={formValue?.workSchedule}
          onChange={handleChange}
        />
        <label htmlFor="workSchedule">График работы</label>
      </FloatLabel>
    </>
  )
}

export default ServiceTypeForm
