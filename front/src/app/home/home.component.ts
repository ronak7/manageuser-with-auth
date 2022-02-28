import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { environment } from 'src/environments/environment';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData: any;
  serverURL = environment.serverURL;
  userId = localStorage.getItem('userid');
  constructor(private apiService: ApiService, private authService: AuthService, private spinner: SpinnerVisibilityService) { }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  async getLoggedInUser()  {
    this.spinner.show();
    this.apiService.getData('/user/'+this.userId).subscribe(async (res) => {
      if (res.status) {
        this.userData = res.data[0]
        this.userData.image = (this.userData.image == "") ? "assets/img/default.png" : this.serverURL +'/'+this.userData.image
        this.spinner.hide();
      } else {
        await this.authService.loggedIn();
      }
    })
  }
}
