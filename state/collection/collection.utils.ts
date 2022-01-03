import { Option, Property } from './collection.types'

export const findByName = (collection: { name: string }[] | undefined, name: string) =>
  collection?.find((item: Property | Option) => item.name === name)

export const findById = (collection: { name: string }[] | undefined, id?: string) =>
  collection?.find((item: Property | Option) => item.id === id)

export const getPropertyWithOption = (property: Property, newOption: Option) => {
  const isNewOption = !findById(property.options, newOption.id)
  console.log('isNewOption', isNewOption)
  console.log('newOption', newOption)
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

export const sliceArrayByChunks = (array: Array<any>, chunkSize = 100) =>
  array.reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize)

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = []
    }

    acc[chunkIndex].push(item)

    return acc
  }, [])

export const getRandomOptionList = (properties: Property[] = []) =>
  properties
    .map((property) => {
      if (!property.options) return
      const randomIndex = Math.floor(Math.random() * property.options.length)
      return property.options[randomIndex]
    })
    .filter(Boolean) as Option[]
