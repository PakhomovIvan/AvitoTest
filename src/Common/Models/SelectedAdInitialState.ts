import { AdParams } from './AdParams'

export interface SelectedAdInitialState {
  ad: AdParams | null
  mode: 'create' | 'edit'
}
