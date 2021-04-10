import {CompaniesActions, CompaniesActionsUnion} from "../actions/companies.actions";
import {Company} from "../../shared/interfaces/company.interface";

export interface State {
  companies: Company[]
  pending: boolean,
  hasError: boolean,
}

export const initialState: State = {
  companies: [],
  pending: false,
  hasError: false,
}

export function reducer(state: State = initialState, action: CompaniesActionsUnion): State {
  switch (action.type) {
    case CompaniesActions.GetCompaniesRequest:
      return {
        ...state,
        pending: true
      }
    case CompaniesActions.GetCompaniesRequestSuccess:
      return {
        ...state,
        companies: action.payload.companies,
        pending: false,
      }
    case CompaniesActions.GetCompaniesRequestError:
      return {
        ...state,
        pending: false,
        hasError: true,
      }
    case CompaniesActions.AddCompanyRequest:
      return {
        ...state,
        pending: true,
      }
    case CompaniesActions.AddCompanyRequestSuccess:
      return {
        ...state,
        pending: false,
      }
    case CompaniesActions.AddCompanyRequestError:
      return {
        ...state,
        pending: false,
        hasError: true,
      }
    default:
      return {
        ...state
      }
  }
}
