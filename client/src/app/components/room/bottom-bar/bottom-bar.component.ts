import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {

  @Output() sendMessageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(event: any): void {
    const text = event.target[0].value;
    if (!!text) {
      this.sendMessageEvent.emit(text);
    }
  }
}
