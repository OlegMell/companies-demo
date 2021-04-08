import {Action} from "@ngrx/store";
import {Company} from "../../shared/interfaces/company.interface";

export enum CompaniesActions {
  GetCompaniesRequest = '[Companies List] Get Companies Request',
  GetCompaniesRequestSuccess = '[Companies List] Get Companies Request Success',
  GetCompaniesRequestError = '[Companies List] Get Companies Request Error',

  AddCompanyRequest = '[Companies List] Add Company Request',
  AddCompanyRequestSuccess = '[Companies List] Add Company Request Success',
  AddCompanyRequestError = '[Companies List] Add Company Request Error',
}

export class GetCompaniesRequest implements Action {
  readonly type = CompaniesActions.GetCompaniesRequest
}

export class GetCompaniesRequestSuccess implements Action {
  readonly type = CompaniesActions.GetCompaniesRequestSuccess

  constructor(public readonly payload: { companies: Company[] }) {
  }
}

export class GetCompaniesRequestError implements Action {
  readonly type = CompaniesActions.GetCompaniesRequestError
}

export class AddCompanyRequest implements Action {
  readonly type = CompaniesActions.AddCompanyRequest

  constructor(public readonly payload: { company: Company }) {
  }
}

export class AddCompanyRequestSuccess implements Action {
  readonly type = CompaniesActions.AddCompanyRequestSuccess
}

export class AddCompanyRequestError implements Action {
  readonly type = CompaniesActions.AddCompanyRequestError
}


export type CompaniesActionsUnion =
  GetCompaniesRequest |
  GetCompaniesRequestSuccess |
  GetCompaniesRequestError |
  AddCompanyRequest |
  AddCompanyRequestSuccess |
  AddCompanyRequestError
