export type Option = {
  id?: string
  name: string
  propertyName?: string
  fileName?: string
}

export type Property = {
  id?: string
  name: string
  options?: Option[]
}

export type CollectionState = {
  name?: string | undefined
  preview?: string | undefined
  previewMeta?: string[] | undefined
  properties: Property[]
}

export type AddOptionData = {
  propertyName: string
  optionName: string
  fileList: any
}

export type EditOptionData = AddOptionData & {
  id: string
}

export type AddCollectionData = {
  collectionName: string
}
