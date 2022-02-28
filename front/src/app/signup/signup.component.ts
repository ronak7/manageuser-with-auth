import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  alertmsg = false;
  errmsg = '';
  signup: any = {};
  constructor(private authService: AuthService, private loginservice: LoginService, private spinner: SpinnerVisibilityService, private router: Router) { }

  ngOnInit(): void {
  }

  userSignup(signupForm: any) {
    this.spinner.show();
    this.loginservice.postData('/signup', signupForm.value).subscribe(async (res: any) => {
      if (res.status) {
        await localStorage.setItem('authToken', res.data.token);
        await localStorage.setItem('userid', res.data.id);
        this.router.navigate(['userlist']);
      } else {
        this.alertmsg = true;
        this.errmsg = res.msg
      }
    },
      (err) => { },
      () => {
        this.spinner.hide();
      }
    );
  }
}
