export type Option = {
  id?: string
  name: string
  fileName?: string
  propertyName?: string
  rarity?: string
}

export type Property = {
  id?: string
  name: string
  options?: Option[]
  rarity?: string
}

export type CollectionState = {
  name?: string | undefined
  preview?: string | undefined
  previewMeta?: string[] | undefined
  modalId?: string | undefined
  properties: Property[]
}

export type AddOptionData = {
  propertyName: string
  optionName: string
  fileList?: any
  rarity?: string
}

export type EditOptionData = AddOptionData & {
  id: string
}

export type AddCollectionData = {
  collectionName: string
}

export type ReorderPropertiesData = {
  startIndex: number
  endIndex: number
}
