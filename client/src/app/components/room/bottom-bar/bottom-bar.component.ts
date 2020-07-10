import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {

  @Output() sendMessageEvent = new EventEmitter<string>();
  message: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(event): void {
    if (!!this.message) {
      this.sendMessageEvent.emit(this.message);
      this.message = '';
    }
  }
}
