import { Image, Option, Property } from './collection.types'

export const findByName = (collection: { name: string }[] | undefined, name: string) =>
  collection?.find((item: Property | Option) => item.name === name)

export const getPropertyWithOption = (property: Property, newOption: Option) => {
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

export const genereatePropertiesCartesianProduct = (properties: Property[]): Option[][] =>
  properties.reduce(
    (acc: Option[][], { options = [], name: propertyName }) =>
      acc.flatMap((current) => options.map((item) => [current, { ...item, propertyName }].flat())),
    [],
  )

export const getPicturesFromProperties = (properties: Property[] = []) =>
  properties
    .map((property) => {
      if (!property.options) return
      const randomIndex = Math.floor(Math.random() * property.options.length)
      return property.options[randomIndex].picture
    })
    .filter(Boolean) as Image[]
