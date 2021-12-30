import { Store } from './store'

export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
