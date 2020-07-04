import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  roomId: number;
  roomName: string;

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.roomId = history.state.roomId;
    this.roomName = this.route.snapshot.paramMap.get('name');
  }

}
