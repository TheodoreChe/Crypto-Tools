import { combineReducers, Reducer } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { collectionSlice } from '@/state/collection'

const rootReducer = combineReducers({
  [collectionSlice.name]: collectionSlice.reducer,
})

const makeConfiguredStore = (reducer: Reducer) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

const makeStore = () => {
  let reducer
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return makeConfiguredStore(rootReducer)
  } else {
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'root',
      version: 1,
      storage,
    }

    const store = makeConfiguredStore(persistReducer(persistConfig, rootReducer))
    // @ts-ignore
    store.__persistor = persistStore(store)

    return store
  }
}

export const wrapper = createWrapper(makeStore)
export type Store = ReturnType<typeof makeStore>
