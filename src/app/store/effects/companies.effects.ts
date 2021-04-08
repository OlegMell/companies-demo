import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FirebaseService} from "../../shared/services/firebase.service";
import {
  AddCompanyRequest, AddCompanyRequestError, AddCompanyRequestSuccess,
  CompaniesActions,
  GetCompaniesRequestError,
  GetCompaniesRequestSuccess
} from "../actions/companies.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {Company} from "../../shared/interfaces/company.interface";


@Injectable({providedIn: 'root'})
export class CompaniesEffects {

  loadCompanies$ = createEffect(() => this.actions$.pipe(
    ofType(CompaniesActions.GetCompaniesRequest),
    mergeMap(() => this.firebaseService.getCompanies()
      .pipe(
        map(res => res.body),
        map(body => {
          const companies: Company[] = Object.keys(body)
            .map(item => ({
              ...body[item],
              id: item
            }))

          return new GetCompaniesRequestSuccess({companies})
        }),
        catchError(() => of(new GetCompaniesRequestError()))
      ))
  ))

  addCompany$ = createEffect(() => this.actions$.pipe(
    ofType(CompaniesActions.AddCompanyRequest),
    mergeMap((action: AddCompanyRequest) =>
      this.firebaseService.addCompany(action.payload.company)
        .pipe(
          map((res) => new AddCompanyRequestSuccess()),
          catchError(() => of(new AddCompanyRequestError()))
        ))
  ))

  constructor(private readonly actions$: Actions,
              private readonly firebaseService: FirebaseService) {
  }
}
