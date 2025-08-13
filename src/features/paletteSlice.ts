import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface PaletteState {
  colors: string[]
}

const initialState: PaletteState = {
  colors: [],
}

const paletteSlice = createSlice({
  name: 'palette',
  initialState,
  reducers: {
    setColors(state, action: PayloadAction<string[]>) {
      state.colors = action.payload
    },
  },
})

export const { setColors } = paletteSlice.actions
export default paletteSlice.reducer

