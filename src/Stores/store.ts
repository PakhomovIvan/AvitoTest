import { configureStore } from '@reduxjs/toolkit'
import spinnerSlice from './slices/spinnerSlice'
import toastSlice from './slices/toastSlice'

const store = configureStore({
  reducer: {
    toast: toastSlice,
    spinner: spinnerSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
