import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, Subscription } from 'rxjs';
import { HttpService, ServerToClientChatMessage } from '../shared/http.service';
import { ClientToServerChatMessage, JoinRoomRequest, SocketIoService } from './shared/socket-io.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  private roomId: number;
  private getMessagesObsSubscription: Subscription;

  roomName: string;
  messages: ServerToClientChatMessage[] = [];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private socketIoService: SocketIoService) {
  }


  ngOnInit(): void {
    if (history.state.roomId) {
      sessionStorage.setItem('roomId', history.state.roomId);
    }
    this.roomId = +sessionStorage.getItem('roomId');
    this.roomName = this.route.snapshot.paramMap.get('name');


    const msg: JoinRoomRequest = { username: JSON.parse(sessionStorage.getItem('user')).username, room: this.roomName };
    this.socketIoService.joinRoom(msg);

    this.getMessagesObsSubscription = concat(this.httpService.getPreviousMessages(this.roomId), this.socketIoService.getMessagesObs())
      .subscribe((
        newMessages: ServerToClientChatMessage[]) => {
        this.messages.push(...newMessages);
      });
  }

  ngOnDestroy(): void {
    this.getMessagesObsSubscription.unsubscribe();
  }

  onSendMessage(message: string): void {
    const messageObj: ClientToServerChatMessage = { roomId: this.roomId, personId: 1, text: message };
    this.socketIoService.sendMessage(messageObj);
  }
}
