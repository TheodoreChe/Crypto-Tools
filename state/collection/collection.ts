import { v4 as uuidv4 } from 'uuid'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import localForage from 'localforage'
import { FileWithDirectoryHandle } from 'browser-fs-access'
import { createName, findByName, getPropertyWithOption } from './collection.utils'
import {
  AddCollectionData,
  AddOptionData,
  CollectionState,
  EditOptionData,
  Property,
  ReorderPropertiesData,
} from './collection.types'

const initialCollectionState: CollectionState = {
  properties: [
    {
      id: uuidv4(),
      name: 'Background',
      rarity: '100',
      options: [],
    },
  ],
}

const getFileName = (id: string) => `layer__${id}`

export const addOption = createAsyncThunk('collection/addOptionStatus', async (payload: AddOptionData) => {
  try {
    const { propertyName, optionName, fileList, rarity = '100' } = payload ?? {}
    const id = uuidv4()
    let fileName
    if (fileList && fileList.length > 0) {
      fileName = getFileName(id)
      await localForage.setItem(fileName, new Blob(fileList, { type: 'image/png' }))
    }

    return {
      id,
      propertyName,
      name: optionName,
      fileName,
      rarity,
    }
  } catch (e) {
    console.log(e)
  }
})

export const editOption = createAsyncThunk('collection/editOptionStatus', async (payload: EditOptionData) => {
  try {
    const { id, propertyName, optionName, fileList, rarity = '100' } = payload ?? {}

    let fileName
    if (fileList) {
      fileName = getFileName(id)
      await localForage.setItem(fileName, new Blob(fileList, { type: 'image/png' }))
    }

    return {
      id,
      propertyName,
      name: optionName,
      rarity,
      ...(fileName ? { fileName } : {}),
    }
  } catch (e) {
    console.log(e)
  }
})

export const importCollection = createAsyncThunk(
  'collection/importCollectionStatus',
  async (blobs: FileWithDirectoryHandle[], { dispatch }) => {
    try {
      const files = blobs.filter((file) => file.type === 'image/png')

      for (const file of files) {
        const propertyName = file.directoryHandle?.name
        if (propertyName) {
          await dispatch(
            addOption({
              propertyName,
              optionName: file.name.replace('.png', ''),
              fileList: [file],
            }),
          )
        }
      }
    } catch (e) {
      console.log(e)
    }
  },
)

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

    addUntitledProperty: (state) => {
      state.properties.push({
        id: uuidv4(),
        name: createName(state.properties),
        rarity: '100',
        options: [],
      })
    },

    setProperties: (state, { payload }: PayloadAction<Property[]>) => {
      state.properties = payload
    },

    reorderProperties: (state, { payload }: PayloadAction<ReorderPropertiesData>) => {
      const properties = Array.from(state.properties)
      const [removed] = properties.splice(payload.startIndex, 1)
      properties.splice(payload.endIndex, 0, removed)

      state.properties = properties
    },

    deleteProperties: (state) => {
      localForage.clear()
      state.properties = []
    },

    deletePropertyById: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.properties = state.properties.filter(({ id }) => id !== payload.id)
    },

    deleteOptionById: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.properties = state.properties.map((property) => {
        if (property.options && property.options.find(({ id }) => id === payload.id)) {
          return {
            ...property,
            options: property.options.filter(({ id }) => id !== payload.id),
          }
        }
        return property
      })
    },

    deleteCollection: (state) => {
      localForage.clear()
      return initialCollectionState
    },

    setModalId: (state, { payload }: PayloadAction<string | undefined>) => {
      state.modalId = payload
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
          newProperties = [
            ...properties,
            getPropertyWithOption({ id: uuidv4(), name: payload.propertyName, rarity: '100' }, payload),
          ]
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
  addUntitledProperty,
  deleteCollection,
  deleteOptionById,
  deleteProperties,
  deletePropertyById,
  reorderProperties,
  setModalId,
  setProperties,
} = collectionSlice.actions
