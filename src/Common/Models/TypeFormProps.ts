import { AdFormValues } from './AdFormValues'

export interface ServiceTypeFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  formValue: AdFormValues | null
}
