import { Injectable } from '@angular/core';
import socketIOClient from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';


export interface Message {
  room: string;
  name: string;
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

   public joinRoom(message: Message): void {
    this.socket.emit('join', message);
  }

  public sendMessage(message: any): void {
    this.socket.emit('sendMessage', message);
  }

  public getMessagesObs(): Observable<string> {
    return Observable.create((observer) => {
        this.socket.on('message', (message) => {
            observer.next(message);
        });
    });
  }
}
