import { RootState } from '../store.types'
import { createSelector, Selector } from 'reselect'
import { CollectionState, Option, Property } from './collection.types'

export const getCollectionState = (state: RootState): CollectionState => state.collection

/**
 * getCollectionName - Returns the name of the collection
 */
export const getCollectionName: Selector<RootState, string | undefined> = createSelector(
  getCollectionState,
  (state) => state.name,
)

export const getModalId: Selector<RootState, string | undefined> = createSelector(
  getCollectionState,
  (state) => state.modalId,
)

export const getCollectionPreview: Selector<RootState, string | undefined> = createSelector(
  getCollectionState,
  (state) => state.preview,
)

export const getCollectionPreviewMeta: Selector<RootState, string[] | undefined> = createSelector(
  getCollectionState,
  (state) => state.previewMeta,
)

/**
 * getProperties - Returns the properties of the collection
 */
export const getProperties: Selector<RootState, Property[]> = createSelector(
  getCollectionState,
  (state) => state.properties,
)

/**
 * getOptions - Returns all options in the collection
 */
export const getOptions: Selector<RootState, Option[]> = createSelector(getProperties, (properties) =>
  properties.map((property) => property.options || []).flat(),
)

/**
 * getOptionById - Get an option by its id
 */
export const getOptionById = (id?: string): Selector<RootState, Option | undefined> =>
  createSelector(getOptions, (options) => (id ? options.find((option) => option.id === id) : undefined))

/**
 * getPropertiesCartesianProduct - Returns a cartesian product of all properties
 */
export const getPropertiesCartesianProduct: Selector<RootState, Option[][]> = createSelector(
  getProperties,
  (properties) =>
    properties.reduce(
      (acc: Option[][], { options = [], name: propertyName }) =>
        acc.flatMap((current) => options.map((item) => [current, { ...item, propertyName }].flat())),
      [[]],
    ),
)

/**
 * getIsPropertiesEmpty - Returns true if there are no properties
 */
export const getIsPropertiesEmpty: Selector<RootState, boolean> = createSelector(
  getProperties,
  (properties) => properties.length === 0,
)

/**
 * getAmountOfProperties - Returns the amount of properties
 */
export const getAmountOfProperties: Selector<RootState, number> = createSelector(
  getProperties,
  (properties) => properties.length,
)

/**
 * getAmountOfOptions - Returns the amount of options
 */
export const getAmountOfOptions: Selector<RootState, number> = createSelector(getOptions, (options) => options.length)

/**
 * getAmountOfCombinations - Returns the amount of combinations
 */
export const getAmountOfCombinations: Selector<RootState, number> = createSelector(
  getProperties,
  getAmountOfOptions,
  (properties, amountOfOptions) =>
    properties.reduce((acc, { options = [] }) => acc * (options.length || 1), amountOfOptions > 0 ? 1 : 0),
)
