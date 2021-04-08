import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Company} from "../../shared/interfaces/company.interface";
import {GetCompaniesRequest} from "../../store/actions/companies.actions";
import {selectAllCompanies} from "../../store";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, AfterViewInit {
  columns: string[] = ['name', 'owner', 'okpo', 'phone', 'create date']
  companies$: Observable<Company[]>
  addedItem: Subject<boolean>

  constructor(private readonly store: Store) {
    this.addedItem = new Subject<boolean>()
  }

  ngOnInit(): void {
    this.loadCompanies()
  }

  ngAfterViewInit(): void {
    this.addedItem.subscribe(isAdded => {
      if (isAdded) {
        this.loadCompanies()
      }
    })
  }

  private loadCompanies() {
    this.store.dispatch(new GetCompaniesRequest())
    this.companies$ = this.store.select(selectAllCompanies)
  }
}
