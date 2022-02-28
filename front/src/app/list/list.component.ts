import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { environment } from 'src/environments/environment';
import { ApiService } from '../service/api.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  userList: any = [];
  userData: any = {};
  filter: any = {};
  filedata: any = null;
  serverURL = environment.serverURL;
  constructor(private api: ApiService, private spinner: SpinnerVisibilityService) { }

  ngOnInit(): void {
    this.spinner.show();
    let data = { status: true, search: ''}
    this.filterData(data)
  }
  
  filterData(data: object) {
    this.spinner.show();
    this.api.postData('/filteruser', data).subscribe(async (res) => {
      if (res.status) {
        this.userList = res.data
        this.spinner.hide();
      }
    })
  }

  changeStatus(id: String, status: boolean) {
    console.log(id, status);
    this.spinner.show();
    this.api.getData('/changeuserstatus/'+id+'/'+status).subscribe(async (res) => {
      if (res.status) {
        console.log(res)
        console.log(this.filter);
        await this.filterData(this.filter);
        
        this.spinner.hide();
      }
    })
  }

  editUser(id: String) {
    this.spinner.show();
    this.api.getData('/user/'+id).subscribe((res) => {
      if (res.status) {
        this.userData = res.data[0];
        delete this.userData.password
        this.spinner.hide();
        console.log(this.userData);
        $("#myModal").modal()
      }
    })
  }

  uploadFile(e: any) {
    var file = <File>e.target.files[0];
    var fileName = file.name;
    var ext = fileName.split('.').pop();
    this.userData.file = file;

    if (ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "PNG" || ext == "JPEG" || ext == "JPG" || ext == "webp" || ext == "WEBP") {
      this.filedata = <File>e.target.files[0];
      return false;
    } else {
      alert("Please select proper file");
      return false;
    }
  }

  updateUser(userData: any, id = '') {
    let fb: FormData = new FormData();
    if (this.filedata) {
      fb.append('file', this.filedata, this.filedata.name);
    }
    fb.append('firstname', userData.value.firstname);
    fb.append('lastname', userData.value.lastname);
    fb.append('email', userData.value.email);
    fb.append('password', userData.value.password);
    fb.append('oldFile', this.userData.image);
    
    this.spinner.show();
    this.api.putData('/user/'+this.userData._id, fb).subscribe(async (res: any) => {
      if (res.status) {
        $('#myModal').modal('toggle');
        this.userData = {};
        await this.filterData(this.filter);
      }
    },
      (err) => this.spinner.hide(),
      () => {
        this.spinner.hide();
      }
    );
  }

}
