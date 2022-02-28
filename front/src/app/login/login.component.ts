import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};
  alertmsg = false;
  errmsg = '';

  constructor(private authService: AuthService, private loginservice: LoginService, private spinner: SpinnerVisibilityService, private router: Router) { }

  ngOnInit(): void {
  }

  userLogin(loginForm: any) {
    this.spinner.show();
    this.loginservice.postData('/signup', loginForm.value).subscribe(async (res: any) => {
      if (res.status) {
        await localStorage.setItem('authToken', res.data.token);
        await localStorage.setItem('userid', res.data.id);
        this.router.navigate(['userlist']);
      } else {
        this.alertmsg = true;
        this.errmsg = res.msg
      }
    },
    (err) => {},
    () => {
      this.spinner.hide();
    }
    );
  }

}
