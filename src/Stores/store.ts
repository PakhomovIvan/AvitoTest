import { configureStore } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import adsSlice from './slices/adsSlice'
import selectedAdSlice from './slices/selectedAdSlice'
import spinnerSlice from './slices/spinnerSlice'
import toastSlice, { setToast } from './slices/toastSlice'

const store = configureStore({
  reducer: {
    ads: adsSlice,
    selectedAd: selectedAdSlice,
    toast: toastSlice,
    spinner: spinnerSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      store.dispatch(setToast({ type: 'error', message: error.message }))
      throw new AxiosError(error.message)
    } else if (error instanceof Error) {
      store.dispatch(setToast({ type: 'error', message: error.stack }))
      throw new Error(error.stack)
    }
    throw error
  }
)
