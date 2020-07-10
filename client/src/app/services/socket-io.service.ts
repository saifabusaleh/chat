import { Injectable } from '@angular/core';
import socketIOClient from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';
import { ServerToClientChatMessage } from './http.service';

export interface ClientToServerChatMessage {
  text: string;
  roomId: number;
  personId: number;
}

export interface JoinRoomRequest {
  room: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})

export class SocketIoService {

  private socket;
  readonly BASE_URL = 'http://localhost:3333';
  constructor() {
    this.socket = socketIOClient(this.BASE_URL);
  }

  public joinRoom(message: JoinRoomRequest): void {
    this.socket.emit('join_room', message);
  }

  public sendMessage(message: ClientToServerChatMessage): void {
    this.socket.emit('sendMessage', message);
  }

  public getMessagesObs(): Observable<ServerToClientChatMessage> {
    return new Observable((observer) => {
      this.socket.on('message', (message: ServerToClientChatMessage) => {
        observer.next(message);
      });
    });
  }
}
