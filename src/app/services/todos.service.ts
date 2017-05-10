import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment as ENV } from '../../environments/environment';
import { SharedService } from './shared.service';

@Injectable()
export class TodosService {

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
    params.set('api_key', ENV.api_key);

    return this.http.get(ENV.api_url + '/task/todo', { search: params, headers: headers })
           .map(this.extractData).catch(this.handleError);

  }

  doneTasks(): Observable<any> {

    let token = this.sharedService.token();
    let headers = new Headers({
      'Authorization': 'Bearer ' + token
    });

    let params: URLSearchParams = new URLSearchParams();
    params.set('api_key', ENV.api_key);

    return this.http.get(ENV.api_url + '/task/done', { search: params, headers: headers })
           .map(this.extractData)
           .catch(this.handleError);

  }

  addTask(task): Observable<any> {

    let token = this.sharedService.token();
    let headers = new Headers({
      'Authorization': 'Bearer ' + token
    });


    let params: URLSearchParams = new URLSearchParams();
    params.set('api_key', ENV.api_key);

    return this.http.post(ENV.api_url + '/task/create', task, { search: params, headers: headers })
           .map(this.extractData)
           .catch(this.handleError);
  }

  updateTask(taskId): Observable<any> {

    let token = this.sharedService.token();
    let headers = new Headers({
      'Authorization': 'Bearer ' + token
    });


    let params: URLSearchParams = new URLSearchParams();
    params.set('api_key', ENV.api_key);

    return this.http.put(ENV.api_url + '/task/' + taskId, null, { search: params, headers: headers })
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
