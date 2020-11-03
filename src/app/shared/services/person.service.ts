import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { UserI } from '../interfaces/UserI';

@Injectable({
  providedIn: "root",
})
export class PersonService {
  url: string;

  constructor(public httpClient: HttpClient) {
    this.url = environment.urlApi + 'person/';
  }

  public savePerson(person): Observable<any> {
    return this.httpClient.post(this.url + 'save', person);
  }
  public login(person): Observable<any> {
    return this.httpClient.post(this.url + 'save', person);
  }
}
