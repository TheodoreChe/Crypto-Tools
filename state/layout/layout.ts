import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { layoutName, LayoutState } from './layout.types'

const initialLayoutState: LayoutState = {
  name: layoutName.WELCOME_SCREEN,
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialLayoutState,
  reducers: {
    setLayout: (state, action: PayloadAction<layoutName>) => {
      state.name = action.payload
    },
  },
})

export const { setLayout } = layoutSlice.actions
