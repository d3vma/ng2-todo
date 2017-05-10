import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SharedService } from './shared.service';

@Injectable()
export class TodosService {

  private apiUrl: string = "http://pilot.tqweem.com/api";

  constructor(
    private http: Http,
    private sharedService: SharedService
  ) { }

  all(): Observable<any> {

    let token = this.sharedService.token();
    let headers = new Headers({
      'Authorization': 'Bearer ' + token
    });

    let params: URLSearchParams = new URLSearchParams();
    params.set('api_key', 'c6fb4df3de49fa3081c9651127e01380');

    return this.http.get(this.apiUrl + '/task/todo', { search: params, headers: headers })
           .map(this.extractData).catch(this.handleError);

  }

  doneTasks(): Observable<any> {

    let token = this.sharedService.token();
    let headers = new Headers({
      'Authorization': 'Bearer ' + token
    });

    let params: URLSearchParams = new URLSearchParams();
    params.set('api_key', 'c6fb4df3de49fa3081c9651127e01380');

    return this.http.get(this.apiUrl + '/task/done', { search: params, headers: headers })
           .map(this.extractData)
           .catch(this.handleError);

  }

  // addTask(): Observable<any> {

  //   let token = this.sharedService.token();
  //   let headers = new Headers({
  //     'Authorization': 'Bearer ' + token
  //   });

  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('api_key', 'c6fb4df3de49fa3081c9651127e01380');

  //   return this.http.post(this.apiUrl + '/task/create', { search: params, headers: headers })
  //          .map(this.extractData)
  //          .catch(this.handleError);

  // }

  addTask(user): Observable<any> {

    let token = this.sharedService.token();
    let headers = new Headers({
      'Authorization': 'Bearer ' + token
    });


    let params: URLSearchParams = new URLSearchParams();
    params.set('api_key', 'c6fb4df3de49fa3081c9651127e01380');

    return this.http.post(this.apiUrl + '/task/create', user, { search: params, headers: headers })
           .map(this.extractData)
           .catch(this.handleError);
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
