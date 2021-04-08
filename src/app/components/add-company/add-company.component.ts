import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AddCompanyRequest} from "../../store/actions/companies.actions";
import {Company} from "../../shared/interfaces/company.interface";
import {selectAddingStatus} from "../../store";
import {Subject} from "rxjs";

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup

  @Input()
  addedItem: Subject<boolean>

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      'createdate': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'owner': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'okpo': new FormControl('', Validators.required)
    })
  }

  addCompany() {
    const company: Company = {
      createdate: new Date().getTime(),
      okpo: this.okpo.value,
      name: this.name.value,
      phone: this.phone.value,
      owner: this.owner.value
    }

    this.store.dispatch(new AddCompanyRequest({company}))

    this.store.select(selectAddingStatus).subscribe(isAdded => {
      if (isAdded) {
        this.companyForm.reset()
        Object.keys(this.companyForm.controls).forEach(key => {
          this.companyForm.get(key).setErrors(null);
        });

        this.addedItem.next(isAdded)
      }
    })
  }


  get createdate() {
    return this.companyForm.get('createdate')
  }

  get name() {
    return this.companyForm.get('name')
  }

  get owner() {
    return this.companyForm.get('owner')
  }

  get phone() {
    return this.companyForm.get('phone')
  }

  get okpo() {
    return this.companyForm.get('okpo')
  }
}
