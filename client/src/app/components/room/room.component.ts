import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService, ServerToClientChatMessage } from '@services/http.service';
import { SocketIoService, JoinRoomRequest, ClientToServerChatMessage } from '@services/socket-io.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  private roomId: number;
  private getPrevMessagesSubscription: Subscription;
  private getMessagesObsSubscription: Subscription;

  roomName: string;
  messages: ServerToClientChatMessage[];

  constructor(private route: ActivatedRoute,
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
    this.getPrevMessagesSubscription = this.httpService.getPreviousMessages(this.roomId)
      .subscribe((previousMessages: ServerToClientChatMessage[]) => {
        this.messages = previousMessages;
        this.socketIoService.joinRoom(msg);
        this.getNewMessages();
      });
  }

  ngOnDestroy(): void {
    this.getPrevMessagesSubscription.unsubscribe();
    this.getMessagesObsSubscription.unsubscribe();
  }

  onSendMessage(message: string): void {
    const messageObj: ClientToServerChatMessage = { roomId: this.roomId, personId: 1, text: message };
    this.socketIoService.sendMessage(messageObj);
  }

  getNewMessages(): void {
    this.socketIoService.getMessagesObs().subscribe((newMsg: ServerToClientChatMessage) => {
      this.messages = [...this.messages, newMsg];
    });
  }
}
