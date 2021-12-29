import { RootState } from '../store.types'
import { layoutName, LayoutState } from './layout.types'
import { createSelector, Selector } from 'reselect'

export const getLayoutState = (state: RootState): LayoutState => state.layout

export const getLayoutName: Selector<RootState, layoutName> = createSelector(getLayoutState, (state) => state.name)

export const getIsWelcomeScreen: Selector<RootState, boolean> = createSelector(
  getLayoutName,
  (name) => name === layoutName.WELCOME_SCREEN,
)
