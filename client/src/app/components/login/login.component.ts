import { Component, OnInit, ValueProvider } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, RegisterResponse } from 'src/app/services/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private httpService: HttpService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['/rooms']);
    }
  }


  public onSubmit(event): void {
    const username = event.target.user.value;
    if (!!username) {
      // do join
      this.httpService.join(username).subscribe((res: RegisterResponse[]) => {
        if (res && res[0]) {
          sessionStorage.setItem('user', JSON.stringify({ username: res[0].name, id: res[0].person_id }));
          this.router.navigate(['/rooms']);
        }
      });
    }
  }
}
