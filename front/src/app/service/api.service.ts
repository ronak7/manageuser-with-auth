import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token = localStorage.getItem('authToken');
  constructor(private http: HttpClient) { }

  postData(url: string, data: any = {}) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    let options = { headers };
    return this.http
      .post<any>(environment.apiURL + url, data, options)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  putData(url: string, data: any = {}) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    let options = { headers };
    return this.http
      .put<any>(environment.apiURL + url, data, options)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getData(url: String, data: any = {}) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    let options = { headers };
    return this.http
      .get<any>(environment.apiURL + url, options)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }


}
