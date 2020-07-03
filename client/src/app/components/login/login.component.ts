import { Component, OnInit, ValueProvider } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name: string;

  constructor() { }

  ngOnInit(): void {
  }


  public onSubmit(event: any): ValueProvider {
    return event.target.user.value;
  }


}
