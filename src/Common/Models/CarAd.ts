import { Ad } from './Ad'

export interface CarAd extends Ad {
  brand: string
  model: string
  year: Date
  mileage: number
}
