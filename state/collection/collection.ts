import { v4 as uuidv4 } from 'uuid'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import localForage from 'localforage'
import { findByName, getPropertyWithOption } from './collection.utils'
import { AddCollectionData, AddOptionData, CollectionState, EditOptionData, Property } from './collection.types'

const initialCollectionState: CollectionState = {
  properties: [],
}

export const addOption = createAsyncThunk('collection/addOptionStatus', async (payload: AddOptionData, thunkAPI) => {
  try {
    const { propertyName, optionName, fileList } = payload ?? {}
    const fileName = `${propertyName}__${optionName}`
    await localForage.setItem(fileName, new Blob(fileList, { type: 'image/png' }))

    return {
      id: uuidv4(),
      propertyName,
      name: optionName,
      fileName,
    }
  } catch (e) {
    console.log(e)
  }
})

export const editOption = createAsyncThunk('collection/editOptionStatus', async (payload: EditOptionData, thunkAPI) => {
  try {
    const { id, propertyName, optionName, fileList } = payload ?? {}

    let fileName
    if (fileList) {
      fileName = `${propertyName}__${optionName}`
      await localForage.setItem(fileName, new Blob(fileList, { type: 'image/png' }))
    }

    return {
      id,
      propertyName,
      name: optionName,
      fileName,
    }
  } catch (e) {
    console.log(e)
  }
})

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: initialCollectionState,
  reducers: {
    addCollection: (state, { payload }: PayloadAction<AddCollectionData>) => {
      state.name = payload.collectionName
    },

    addPreview: (state, { payload }: PayloadAction<string>) => {
      state.preview = payload
    },

    addPreviewMeta: (state, { payload }: PayloadAction<string[]>) => {
      state.previewMeta = payload
    },

    deleteProperties: (state) => {
      localForage.clear()
      state.properties = []
    },

    deletePropertyByName: (state, { payload }: PayloadAction<{ propertyName: string }>) => {
      state.properties = state.properties.filter(({ name }) => name !== payload.propertyName)
    },

    deleteOptionByName: (state, { payload }: PayloadAction<{ propertyName: string; optionName: string }>) => {
      state.properties = state.properties.map((property) => {
        if (property.name === payload.propertyName && property.options) {
          return {
            ...property,
            options: property.options.filter(({ name }) => name !== payload.optionName),
          }
        }
        return property
      })
    },

    deleteCollection: (state) => {
      localForage.clear()
      return initialCollectionState
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addOption.fulfilled, (state, { payload }) => {
        if (payload == null) {
          return
        }

        const { properties } = state

        const isNewProperty = !findByName(properties, payload.propertyName)
        let newProperties: Property[]

        if (isNewProperty) {
          newProperties = [...properties, getPropertyWithOption({ id: uuidv4(), name: payload.propertyName }, payload)]
        } else {
          newProperties = properties.map((property) => {
            if (property.name === payload.propertyName) {
              return getPropertyWithOption(property, payload)
            }
            return property
          })
        }

        state.properties = newProperties
      })
      .addCase(editOption.fulfilled, (state, { payload }) => {
        if (payload == null) {
          return
        }
        const { properties } = state

        state.properties = properties.map((property) => {
          if (property.name === payload.propertyName) {
            return getPropertyWithOption(property, payload)
          }
          return property
        })
      })
  },
})

export const {
  addCollection,
  addPreview,
  addPreviewMeta,
  deleteCollection,
  deleteOptionByName,
  deleteProperties,
  deletePropertyByName,
} = collectionSlice.actions
