import {Injectable} from '@angular/core';
import {Headers, Http, Response, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class PixabayService {
  headers: Headers;

  api_url: string = 'https://pixabay.com/api/?key=';

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  private getJson(resp: Response) {
    return resp.json();
  }

  private checkForError(resp: Response): Response {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      const error = new Error(resp.statusText);
      error['response'] = error;
      console.log(error);
      throw error;
    }
  }

  get(token: string): Observable<any> {
    var url = this.api_url+token;
    return this.http.get(url)
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)

  }
}
