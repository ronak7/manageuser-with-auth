import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  options = { headers: {} };
  
  constructor(private http: HttpClient) { }

  postData(url: string, data: any = {}) {
    return this.http
      .post<any>(environment.apiURL + url, data, this.options)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
