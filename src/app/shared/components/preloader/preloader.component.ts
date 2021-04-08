import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectPendingStatus} from "../../../store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  isActive$: Observable<boolean>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isActive$ = this.store.select(selectPendingStatus)
  }

}
