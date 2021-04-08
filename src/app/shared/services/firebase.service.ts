import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class FirebaseService {
  API_URL: string = 'https://melnik-task-default-rtdb.firebaseio.com/companies.json'

  constructor(private readonly httpClient: HttpClient) {
  }

  public getCompanies(): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.API_URL, {
      observe: 'response',
    })
  }

  public addCompany(company): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.API_URL, {
      ...company
    }, {
      observe: 'response'
    })
  }
}
