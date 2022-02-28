import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  loggedIn = () => {
    return !!localStorage.getItem('authToken');
  }

  logOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userid');
    this.router.navigate(['login']);
  }
  
}
