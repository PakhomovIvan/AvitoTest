import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AdParams } from '../../Common/Models/AdParams'
import { AdsInitialState } from '../../Common/Models/AdsInitialState'

const initialState: AdsInitialState = {
  ads: [],
}

export const fetchAds = createAsyncThunk(
  'ads/fetchAds',
  async (url: string) => {
    const res = await axios.get<AdParams[]>(url)
    return res.data
  }
)

export const deleteAd = createAsyncThunk('ads/deleteAd', async (id: number) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`)
  return id
})

export const postAd = createAsyncThunk<
  AdParams,
  { url: string; ad: Omit<AdParams, 'id'> },
  { rejectValue: string }
>('ads/postAd', async ({ url, ad }) => {
  const res = await axios.post<AdParams>(url, ad)
  return res.data
})

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      state.ads = action.payload
    })
    builder.addCase(
      postAd.fulfilled,
      (state, action: PayloadAction<AdParams>) => {
        state.ads = [...state.ads, action.payload]
      }
    )
    builder.addCase(
      deleteAd.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.ads = state.ads.filter((ad) => ad.id !== action.payload)
      }
    )
  },
})

export const { reducer: adsReducer, actions: adsAction } = adsSlice

export const selectAds = (state: { ads: { ads: AdParams[] } }) => state.ads.ads

export default adsSlice.reducer
