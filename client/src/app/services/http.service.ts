import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly BASE_API_URL = 'http://localhost:3333/api';

  constructor(private http: HttpClient) { }


  public getRooms(): Observable<any> {
   const reqUrl = `${this.BASE_API_URL}/rooms`;
   return this.http.get(reqUrl);
  }
}
