import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {selectHasError} from "../../../store";
import {Store} from "@ngrx/store";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private readonly snackbar: MatSnackBar,
              private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectHasError)
      .subscribe(err => {
        if (err) {
          this.snackbar.open("Что-то пошло не так(", "", {
            duration: 1000
          })
        }
      })
  }

}
