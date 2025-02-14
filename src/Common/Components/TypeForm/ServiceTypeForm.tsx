import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { ServiceTypeFormProps } from '../../Models/TypeFormProps'

const ServiceTypeForm = ({ handleChange, formValue }: ServiceTypeFormProps) => {
  return (
    <>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="serviceType"
          value={formValue?.serviceType}
          onChange={handleChange}
        />
        <label htmlFor="serviceType">Категория услуги</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="experience"
          value={formValue?.experience}
          onChange={handleChange}
        />
        <label htmlFor="experience">Опыт (в годах)</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="cost"
          value={formValue?.cost}
          onChange={handleChange}
        />
        <label htmlFor="cost">Стоимость услуги</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          id="workSchedule"
          value={formValue?.workSchedule}
          onChange={handleChange}
        />
        <label htmlFor="workSchedule">Время работы</label>
      </FloatLabel>
    </>
  )
}

export default ServiceTypeForm
