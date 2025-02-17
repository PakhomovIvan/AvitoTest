import { DropdownChangeEvent } from 'primereact/dropdown'
import { AdFormValues } from './AdFormValues'

export interface ServiceTypeFormProps {
  setAdditionalFormValue: (
    e: React.ChangeEvent<HTMLInputElement> | null
  ) => void
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | DropdownChangeEvent
  ) => void
  formValue: AdFormValues | null
}
