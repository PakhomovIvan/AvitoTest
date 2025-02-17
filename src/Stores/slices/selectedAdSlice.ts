import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AdParams } from '../../Common/Models/AdParams'
import { SelectedAdInitialState } from '../../Common/Models/SelectedAdInitialState'

const initialState: SelectedAdInitialState = {
  ad: null,
  mode: 'create',
}

export const fetchSelectedAd = createAsyncThunk<
  AdParams,
  { url: string; id: number }
>('selectedAd/fetchSelectedAd', async ({ url, id }) => {
  const res = await axios.get<AdParams>(`${url}/${id}`)
  return res.data
})

const selectedAdSlice = createSlice({
  name: 'selectedAd',
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSelectedAd.fulfilled,
      (state, action: PayloadAction<AdParams>) => {
        state.ad = action.payload
        state.mode = 'edit'
      }
    )
  },
})

export const { reducer: selectedAdReducer, actions: selectedAdActions } =
  selectedAdSlice
export const selectSelectedAd = (state: {
  selectedAd: { ad: AdParams | null }
}) => state.selectedAd.ad
export const selectMode = (state: {
  selectedAd: { mode: SelectedAdInitialState }
}) => state.selectedAd.mode

export default selectedAdSlice.reducer
