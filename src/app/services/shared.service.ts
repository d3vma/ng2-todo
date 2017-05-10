import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class SharedService {

  constructor(
    private router: Router
  ) { }

  token() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).token;
    }
  }

  userProfile() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

}
