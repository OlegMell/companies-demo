import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Company} from "../../shared/interfaces/company.interface";
import {GetCompaniesRequest} from "../../store/actions/companies.actions";
import {selectAddingStatus, selectAllCompanies} from "../../store";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, AfterViewInit, OnDestroy {
  columns: string[] = ['name', 'owner', 'okpo', 'phone', 'create date']
  companies$: Observable<Company[]>
  addedItem$: Subscription

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.loadCompanies()
  }

  ngAfterViewInit(): void {
    this.addedItem$ = this.store.select(selectAddingStatus)
      .subscribe((isAdded) => {
        if (isAdded) {
          this.loadCompanies()
        }
      })
  }

  ngOnDestroy(): void {
    this.addedItem$.unsubscribe()
  }

  private loadCompanies() {
    this.store.dispatch(new GetCompaniesRequest())
    this.companies$ = this.store.select(selectAllCompanies)
  }
}
