import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserI } from '../interfaces/UserI';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: UserI | undefined;
  url: string;
  constructor(public httpClient: HttpClient) {
    this.url = environment.urlApi + 'person/';
  }

  public login(person): Observable<any> {
    return this.httpClient.post(this.url + 'login', person);
  }

  isLogged() {
    const user = window.localStorage.getItem('user') || undefined;
    const isLogged = user ? true : false;
    if (isLogged) this.user = JSON.parse(user);
    return isLogged;
  }

  logout() {
    window.localStorage.clear();
    window.location.href = '';
  }
}
