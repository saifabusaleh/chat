import { Component, Input } from '@angular/core';
import { ServerToClientChatMessage } from '@components/shared/http.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

  constructor() { }

  @Input()
  messages: ServerToClientChatMessage[];

}
