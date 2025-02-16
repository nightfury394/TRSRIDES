import { configureStore } from "@reduxjs/toolkit"
import languageReducer from "./slices/languageSlice"
import bookingReducer from "./slices/bookingSlice"

export const store = configureStore({
  reducer: {
    language: languageReducer,
    booking: bookingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

