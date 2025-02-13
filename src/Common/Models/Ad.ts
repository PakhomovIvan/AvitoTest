import { AdType } from './AdType'

export interface Ad {
  name: string
  description: string
  location: string
  type: AdType
  image?: string
}
