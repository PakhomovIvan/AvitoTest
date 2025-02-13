import { AdParams } from './AdParams'

export interface CarAd extends AdParams {
  brand: string
  model: string
  year: Date | number
  mileage?: number
}
