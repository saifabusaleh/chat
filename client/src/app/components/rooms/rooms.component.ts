import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Subscription } from 'rxjs';

export interface RoomResponse {
  room_id: number;
  name: string;
}
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})


export class RoomsComponent implements OnInit, OnDestroy {

  private getRoomsSubscription: Subscription;
  private createRoomSubscription: Subscription;


  rooms: RoomResponse[];
  roomName: string;

  constructor(private httpService: HttpService) { }


  ngOnInit(): void {
    this.getRoomsSubscription = this.httpService.getRooms().subscribe((rooms: RoomResponse[]) => {
      this.rooms = rooms;
    });
  }

  ngOnDestroy(): void {
    this.getRoomsSubscription.unsubscribe();
    if (this.createRoomSubscription) {
      this.createRoomSubscription.unsubscribe();
    }
  }

  public onSubmit(event): void {
    if (!!this.roomName) {
      this.createRoomSubscription = this.httpService.createRoom(this.roomName).subscribe((newRoom: RoomResponse[]) => {
        if (newRoom && newRoom.length) {
          this.rooms.push(newRoom[0]);
          this.roomName = '';
        }
      });
    }
  }
}
