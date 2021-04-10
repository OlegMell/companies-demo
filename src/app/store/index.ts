import * as companies from './reducers/companies.reducer'
import {ActionReducerMap, createSelector} from "@ngrx/store";

export interface State {
  companies: companies.State
}


export const reducer: ActionReducerMap<State> = {
  companies: companies.reducer
}

export const selectCompaniesState = (state: State) => state.companies

export const selectAllCompanies = createSelector(
  selectCompaniesState,
  (state: companies.State) => state.companies
)

export const selectPendingStatus = createSelector(
  selectCompaniesState,
  (state: companies.State) => state.pending
)

export const selectHasError = createSelector(
  selectCompaniesState,
  (state: companies.State) => state.hasError
)
