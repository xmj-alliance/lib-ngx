import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  getData: (url: string, extractMethod?: (value: Response, index: number) => {}) => Observable<any>;
  throwException: (error: Response) => ErrorObservable;
  extractData: (res: Response) => any;
  postJsonData: (url: string, data: any, extHeaders?: any[]) => Observable<any>;
  deleteData: (url: string) => Observable<any>;  

  constructor(private http: Http) {

    this.getData = (url, extractMethod) => {
      let data = this.http.get(url).map(
        extractMethod || this.extractData
      )
      .catch(this.throwException);
      return data;
    };

    this.throwException = (error) => {
      console.error(error);
      return Observable.throw(error || "Server Error");
    };

    this.extractData = (res) => {
      let data = res.json() || [];
      return data;
    };

    this.postJsonData = (url, data, extHeaders?) => {
      let headers = new Headers({"Content-Type": "application/json"});
      if (extHeaders) {
        for (let header of extHeaders) {
          header.append(header.key, header.value);
        }
      }
      
      let postData = JSON.stringify(data);
      let options = new RequestOptions({
        headers: headers,
      });
  
      return this.http.post(url, postData, options).map(res => res.json());
    };

    this.deleteData = (url) => {
      return this.http.delete(url).map(res => res.json());
    }

  }

}
