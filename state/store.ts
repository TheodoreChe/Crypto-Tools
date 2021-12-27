import { configureStore } from '@reduxjs/toolkit'
import { collectionSlice } from '@/state/collection'
import { layoutSlice } from '@/state/layout'

const store = configureStore({
  reducer: {
    [collectionSlice.name]: collectionSlice.reducer,
    [layoutSlice.name]: layoutSlice.reducer,
  },
})

export default store
