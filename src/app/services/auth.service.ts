import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment as ENV } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  isLoggedIn() {
    return localStorage.getItem("user") == null  ? false : true ;
  }

  authenticateUser(user): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('api_key', ENV.api_key);

    return this.http.post(ENV.api_url + '/login', user, { search: params })
           .map(this.extractData)
           .catch(this.handleError);
  }

  registerUser(user): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('api_key', ENV.api_key);

    return this.http.post(ENV.api_url + '/register', user, { search: params })
           .map(this.extractData)
           .catch(this.handleError);
  }

  token() {
    let user = localStorage.getItem('user');
    if(user) {
      return JSON.parse(user).token;
    }
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg;
    const body = error.json() || '';
    errMsg = body.message || JSON.stringify(body);
    console.error('Http Error', errMsg);
    return Observable.throw(errMsg);
  }

}
