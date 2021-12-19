import {Dispatch, ReactNode } from 'react'

export type Option = {
  id?: string
  name: string
  picture?: any
}

export type Property = {
  id?: string
  name: string
  options?: Option[]
}

export type PropertiesAction = {
  type: string
  data?: Record<string, any>
}

export type PropertiesState = {
  properties: Property[]
}

export type PropertiesContextType = {
  state: PropertiesState
  dispatch: Dispatch<PropertiesAction>
}

export type PropertiesProviderProps = {
  children: ReactNode
}
