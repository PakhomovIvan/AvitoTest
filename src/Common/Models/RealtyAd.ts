import { AdParams } from './AdParams'

export interface RealtyAd extends AdParams {
  propertyType: string
  area: number
  rooms: number
  price: number
}
