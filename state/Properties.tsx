import { createContext, FC, ReactNode, useContext, useReducer, Dispatch } from 'react'
import { PropertiesAction, PropertiesState, PropertiesContextType, PropertiesProviderProps } from './Properties.types'
import { propertiesReducer, INITAIAL_STATE } from './Properties.reducer'

const defaultPropertiesContext: PropertiesContextType = {
  dispatch: () => {},
  state: INITAIAL_STATE,
}

export const PropertiesContext = createContext<PropertiesContextType>(defaultPropertiesContext)

export const PropertiesProvider: FC<PropertiesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(propertiesReducer, INITAIAL_STATE)

  return <PropertiesContext.Provider value={{ state, dispatch }}>{children}</PropertiesContext.Provider>
}

export const usePropertiesContext = (): PropertiesContextType => useContext(PropertiesContext)
