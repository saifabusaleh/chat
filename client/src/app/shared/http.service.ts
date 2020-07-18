import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RoomResponse } from '../rooms/rooms.component';

export interface RegisterResponse {
  name: string;
  person_id: string;
}

export interface ServerToClientChatMessage {
  name: string;
  message_text: string;
  posted_datetime: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly BASE_API_URL = 'http://localhost:3333/api';

  constructor(private http: HttpClient) {
  }

  // users

  public join(username: string): Observable<RegisterResponse[]> {
    const reqUrl = `${this.BASE_API_URL}/register`;
    return this.http.post<RegisterResponse[]>(reqUrl, { username });
  }
  // rooms
  public getRooms(): Observable<RoomResponse[]> {
    const reqUrl = `${this.BASE_API_URL}/rooms`;
    return this.http.get<RoomResponse[]>(reqUrl);
  }

  public createRoom(roomName: string): Observable<RoomResponse[]> {
    const reqUrl = `${this.BASE_API_URL}/createRoom`;
    return this.http.post<RoomResponse[]>(reqUrl, { roomName });
  }


  // messages
  public getPreviousMessages(roomId: number): Observable<ServerToClientChatMessage[]> {
    const reqUrl = `${this.BASE_API_URL}/messages?roomId=${roomId}`;
    return this.http.get<ServerToClientChatMessage[]>(reqUrl);
  }
}

