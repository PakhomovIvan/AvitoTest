import { Ad } from './Ad'

export interface ServicesAd extends Ad {
  serviceType: string
  experience: number
  cost: number
  workSchedule: string | Date //WARN
}
