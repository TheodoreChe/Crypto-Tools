import { RootState } from '../store.types'
import { createSelector, Selector } from 'reselect'
import { CollectionState, Property } from './collection.types'

export const getCollectionState = (state: RootState): CollectionState => state.collection

export const getCollectionName: Selector<RootState, string | undefined> = createSelector(
  getCollectionState,
  (state) => state.name,
)

export const getCollectionPreview: Selector<RootState, string | undefined> = createSelector(
  getCollectionState,
  (state) => state.preview,
)

export const getProperties: Selector<RootState, Property[]> = createSelector(
  getCollectionState,
  (state) => state.properties,
)

export const getIsPropertiesEmpty: Selector<RootState, boolean> = createSelector(
  getProperties,
  (properties) => properties.length === 0,
)
