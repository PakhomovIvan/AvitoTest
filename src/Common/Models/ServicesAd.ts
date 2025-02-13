import { AdParams } from './AdParams'

export interface ServicesAd extends AdParams {
  serviceType: string
  experience: number
  cost: number
  workSchedule?: string | Date //WARN
}
