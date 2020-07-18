import { Component, Input, OnInit } from '@angular/core';
import { ServerToClientChatMessage } from '@components/shared/http.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor() { }

  @Input()
  messages: ServerToClientChatMessage[];

  ngOnInit(): void {
  }

}
