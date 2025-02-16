import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type LanguageState = {
  current: "en" | "pl"
}

const initialState: LanguageState = {
  current: "en",
}

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "pl">) => {
      state.current = action.payload
    },
  },
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer

