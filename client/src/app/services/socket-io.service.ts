import { Injectable } from '@angular/core';
import socketIOClient from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChatMessage } from '@components/room/room.component';


export interface JoinRoom {
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

  public joinRoom(message: JoinRoom): void {
    this.socket.emit('join_room', message);
  }

  public sendMessage(message: ChatMessage): void {
    this.socket.emit('sendMessage', message);
  }

  public getMessagesObs(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (message: any) => {
        observer.next(message);
      });
    });
  }
}
