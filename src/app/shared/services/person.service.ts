import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserI } from '../interfaces/UserI';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  url: string;

  constructor(public httpClient: HttpClient) {
    this.url = environment.urlApi + 'person/';
  }

  public savePerson(person): Observable<any> {
    return this.httpClient.post(this.url + 'save', person);
  }
  public updatePerson(person): Observable<any> {
    return this.httpClient.put(this.url + 'update', person);
  }
  public login(person): Observable<any> {
    return this.httpClient.post(this.url + 'save', person);
  }
  public findPerson(email): Observable<any> {
    return this.httpClient.get(this.url + 'findByNumberOrEmail/' + email);
  }
  public saveContact(body): Observable<any> {
    return this.httpClient.post(this.url + 'contact', body);
  }
  public contactList(id): Observable<any> {
    return this.httpClient.get(this.url + 'contactList/' + id);
  }
  public allMessage(id): Observable<any> {
    return this.httpClient.get(this.url + 'allMessage/' + id);
  }
  public lastMessage(id): Observable<any> {
    return this.httpClient.get(this.url + 'lastMessage/' + id);
  }
}
