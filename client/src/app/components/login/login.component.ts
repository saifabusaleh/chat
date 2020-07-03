import { Component, OnInit, ValueProvider } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public onSubmit(event: any): void {
    const username = event.target.user.value;
    if (!!username) {
      // do join
      sessionStorage.setItem('user', username);
      this.router.navigate([ '/rooms']);
    }
  }
}
