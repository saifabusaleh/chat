import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms$: Observable<any>;

  currentUser = JSON.parse(sessionStorage.getItem('user')).username;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.rooms$ = this.httpService.getRooms();
  }

}
