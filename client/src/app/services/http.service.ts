import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly BASE_API_URL = 'http://localhost:3333/api';

  constructor(private http: HttpClient) { }

  // users

  public join(username: string): Observable<any> {
    const reqUrl = `${this.BASE_API_URL}/register`;
    return this.http.post(reqUrl, {username});
  }
  // rooms
  public getRooms(): Observable<any> {
    const reqUrl = `${this.BASE_API_URL}/rooms`;
    return this.http.get(reqUrl);
  }


  // messages
  public getMessages(roomId: number): Observable<any> {
    const reqUrl = `${this.BASE_API_URL}/messages?roomId=${roomId}`;
    return this.http.get(reqUrl);
  }
}
