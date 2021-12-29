import { v4 as uuidv4 } from 'uuid'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { findByName, getPropertyWithOption } from './collection.utils'
import { AddCollectionData, AddOptionData, CollectionState, Property } from './collection.types'

const initialCollectionState: CollectionState = {
  properties: [],
}

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: initialCollectionState,
  reducers: {
    addCollection: (state, { payload }: PayloadAction<AddCollectionData>) => {
      state.name = payload.collectionName
    },

    deleteCollection: (state) => {
      state.name = undefined
      state.properties = []
    },

    addOption: (state, { payload }: PayloadAction<AddOptionData>) => {
      const { properties } = state
      const { propertyName, optionName, fileList } = payload ?? {}
      const isNewProperty = !findByName(properties, propertyName)
      let newProperties: Property[]

      const picture = URL.createObjectURL(new Blob(fileList, { type: 'image/png' }))
      const newOption = { id: uuidv4(), name: optionName, picture }

      if (isNewProperty) {
        newProperties = [...properties, getPropertyWithOption({ id: uuidv4(), name: propertyName }, newOption)]
      } else {
        newProperties = properties.map((property) => {
          if (property.name === propertyName) {
            return getPropertyWithOption(property, newOption)
          }
          return property
        })
      }

      state.properties = newProperties
    },
  },
})

export const { addOption, addCollection, deleteCollection } = collectionSlice.actions
