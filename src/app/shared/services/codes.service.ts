import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class CodesService {
  url: string;

  constructor(public httpClient: HttpClient) {
    this.url = environment.urlCodes;
  }

  public getCodes(): Observable<any>{
    return this.httpClient.get(this.url);
  }
}
