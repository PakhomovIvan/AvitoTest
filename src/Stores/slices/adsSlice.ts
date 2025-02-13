import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Ad } from '../../Common/Models/Ad'
import { AdsInitialState } from '../../Common/Models/AdsInitialState'

const initialState: AdsInitialState = {
  ads: [],
}

export const fetchAds = createAsyncThunk(
  'ads/fetchAds',
  async (url: string) => {
    const res = await axios.get<Ad[]>(url)
    return res.data
  }
)

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      state.ads = action.payload
    })
  },
})

export const { reducer: adsReducer, actions: adsAction } = adsSlice

export const selectAds = (state: { ads: Ad }) => state.ads

export default adsSlice.reducer
