import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@services/http.service';
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
              private httpService: HttpService) {
   }

  ngOnInit(): void {
    this.roomId = history.state.roomId;
    this.roomName = this.route.snapshot.paramMap.get('name');
    // get messages
    this.messages$ = this.httpService.getMessages(this.roomId);
  }

}
