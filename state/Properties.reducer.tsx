import { v4 as uuidv4 } from 'uuid'
import { PropertiesAction, PropertiesState, Property, Option } from './Properties.types'

export enum PropertiesActions {
  ADD_OPTION = 'ADD_OPTION',
}

export const INITAIAL_STATE = {
  properties: [],
}

const findByName = (collection: Property[] | Option[] | undefined, name: string) =>
  collection?.find((item) => item.name === name)

const getPropertyWithOption = (property: Property, newOption: Option) => {
  const isNewOption = !findByName(property.options, newOption.name)
  let newOptions: Option[]
  if (isNewOption) {
    newOptions = [...(property.options ?? []), newOption]
  } else {
    newOptions =
      property.options?.map((option) => {
        if (option.id === newOption.id) {
          return {
            ...option,
            ...newOption,
          }
        }
        return option
      }) ?? []
  }
  return {
    ...property,
    options: newOptions,
  }
}

export function propertiesReducer(state: PropertiesState = INITAIAL_STATE, action: PropertiesAction): PropertiesState {
  switch (action.type) {
    case PropertiesActions.ADD_OPTION: {
      const { properties } = state
      const { propertyName, optionName } = action.data ?? {}
      const isNewProperty = !findByName(properties, propertyName)
      let newProperties: Property[]

      if (isNewProperty) {
        newProperties = [
          ...properties,
          getPropertyWithOption({ id: uuidv4(), name: propertyName }, { name: optionName }),
        ]
      } else {
        newProperties = properties.map((property) => {
          if (property.name === propertyName) {
            return getPropertyWithOption(property, { name: optionName })
          }
          return property
        })
      }

      return {
        ...state,
        properties: newProperties,
      }
    }

    default:
      return state
  }
}
