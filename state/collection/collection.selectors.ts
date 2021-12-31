import { RootState } from '../store.types'
import { createSelector, Selector } from 'reselect'
import { CollectionState, Option, Property } from './collection.types'

export const getCollectionState = (state: RootState): CollectionState => state.collection

export const getCollectionName: Selector<RootState, string | undefined> = createSelector(
  getCollectionState,
  (state) => state.name,
)

export const getCollectionPreview: Selector<RootState, string | undefined> = createSelector(
  getCollectionState,
  (state) => state.preview,
)

export const getCollectionPreviewMeta: Selector<RootState, string[] | undefined> = createSelector(
  getCollectionState,
  (state) => state.previewMeta,
)

export const getProperties: Selector<RootState, Property[]> = createSelector(
  getCollectionState,
  (state) => state.properties,
)

export const getPropertiesCartesianProduct: Selector<RootState, Option[][]> = createSelector(
  getProperties,
  (properties) =>
    properties.reduce(
      (acc: Option[][], { options = [], name: propertyName }) =>
        acc.flatMap((current) => options.map((item) => [current, { ...item, propertyName }].flat())),
      [[]],
    ),
)

export const getIsPropertiesEmpty: Selector<RootState, boolean> = createSelector(
  getProperties,
  (properties) => properties.length === 0,
)
