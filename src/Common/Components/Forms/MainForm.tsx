import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { ServiceTypeFormProps } from '../../Models/TypeFormProps'

const MainForm = ({
  handleChange,
  formValue,
  setAdditionalFormValue,
}: ServiceTypeFormProps) => {
  const adType = ['Недвижимость', 'Авто', 'Услуги']

  return (
    <>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          keyfilter={/^[а-яА-ЯёЁa-zA-Z0-9\s.,-]+$/}
          maxLength={40}
          id="name"
          value={formValue?.name}
          onChange={handleChange}
        />
        <label htmlFor="name">Название</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          keyfilter={/^[а-яА-ЯёЁa-zA-Z0-9\s.,-]+$/}
          id="description"
          value={formValue?.description}
          onChange={handleChange}
        />
        <label htmlFor="description">Описание</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          autoComplete="off"
          className="w-full"
          keyfilter={/^[а-яА-ЯёЁa-zA-Z0-9\s-]+$/}
          maxLength={30}
          id="location"
          value={formValue?.location}
          onChange={handleChange}
        />
        <label htmlFor="location">Местоположение</label>
      </FloatLabel>
      <FloatLabel className="w-full">
        <InputText
          autoComplete="off"
          className="w-full"
          id="image"
          value={formValue?.image}
          onChange={handleChange}
        />
        <label htmlFor="image">Ссылка на изображение</label>
      </FloatLabel>
      <FloatLabel>
        <Dropdown
          id="type"
          inputId="type"
          value={formValue?.type}
          onChange={(e) => {
            handleChange(e)
            setAdditionalFormValue(null)
          }}
          options={adType}
          optionLabel="type"
          placeholder="Тип объявления"
          className="w-full"
        />
        <label htmlFor="type">Тип объявления</label>
      </FloatLabel>
    </>
  )
}

export default MainForm
