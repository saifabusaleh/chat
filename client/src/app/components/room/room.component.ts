import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@services/http.service';
import { SocketIoService, JoinRoom } from '@services/socket-io.service';
import { Subscription } from 'rxjs';

export interface ChatMessage {
  text: string;
  roomId: number;
  personId: number;
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  roomId: number;
  roomName: string;
  messages: any;

  getPrevMessagesSubscription: Subscription;
  getMessagesObsSubscription: Subscription;

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


    const msg: JoinRoom = { username: JSON.parse(sessionStorage.getItem('user')).username, room: this.roomName };
    this.getPrevMessagesSubscription = this.httpService.getPreviousMessages(this.roomId).subscribe((messages: any) => {
      this.messages = messages;
    });
    this.socketIoService.joinRoom(msg);
    this.getMessages();
  }

  ngOnDestroy(): void {
    this.getPrevMessagesSubscription.unsubscribe();
    this.getMessagesObsSubscription.unsubscribe();
  }

  onSendMessage(message: string): void {
    const messageObj: ChatMessage = { roomId: this.roomId, personId: 1, text: message};
    this.socketIoService.sendMessage(messageObj);
  }

  getMessages(): void {
    this.socketIoService.getMessagesObs().subscribe((newMsg: string) => {
      this.messages = [...this.messages, newMsg];
    });
  }
}
