import { AdType } from './AdType'

export interface AdParams {
  id: number
  name: string
  description: string
  location: string
  type: AdType
  image?: string
}
