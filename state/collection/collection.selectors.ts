import { RootState } from '../store.types'
import { createSelector, Selector } from 'reselect'
import { CollectionState, Image, Option, Property } from './collection.types'
import { genereatePropertiesCartesianProduct } from './collection.utils'

export const getCollectionState = (state: RootState): CollectionState => state.collection

export const getCollectionName: Selector<RootState, string | undefined> = createSelector(
  getCollectionState,
  (state) => state.name,
)

export const getProperties: Selector<RootState, Property[]> = createSelector(
  getCollectionState,
  (state) => state.properties,
)
