export type Image = string | Buffer

export type Option = {
  id?: string
  name: string
  propertyName?: string
  picture?: Image
}

export type Property = {
  id?: string
  name: string
  options?: Option[]
}

export type CollectionState = {
  name?: string | undefined
  properties: Property[]
}

export type AddOptionData = {
  propertyName: string
  optionName: string
  fileList: any
}

export type AddCollectionData = {
  collectionName: string
}
