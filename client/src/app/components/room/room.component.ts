import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@services/http.service';
import { SocketIoService, Message } from '@services/socket-io.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  roomId: number;
  roomName: string;
  messages$: Observable<any>;

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
    // get messages
    this.messages$ = this.httpService.getMessages(this.roomId);


    const msg: Message = { name: JSON.parse(sessionStorage.getItem('user')).username , room: this.roomName};
    this.socketIoService.joinRoom(msg);
    this.getMessages();
  }


  onSendMessage(message: string): void {
    this.socketIoService.sendMessage(message);
  }

  getMessages(): void {
    this.socketIoService.getMessagesObs().subscribe((message: string) => {
      console.log('oops I got message: ', message);
    });
  }

}
