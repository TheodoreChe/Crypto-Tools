export enum layoutName {
  WELCOME_SCREEN = 'WELCOME_SCREEN',
  CREATE_COLLECTION = 'CREATE_COLLECTION',
  ADD_OPTION = 'ADD_OPTION',
  EXPORT_COLLECTION = 'EXPORT_COLLECTION',
}

export type LayoutState = {
  name: layoutName
}
