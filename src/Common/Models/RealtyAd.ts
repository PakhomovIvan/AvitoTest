import { Ad } from './Ad'

export interface RealtyAd extends Ad {
  propertyType: string
  area: number
  rooms: number
  price: number
}
