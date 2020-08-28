import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseUrl = environment.baseUrl;
  errorMsg: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location) { }

  refresh(path: string, options: {}) {
    return this.http.post(this.baseUrl + path + '.json', {}, { headers: options });
  }

  index(path: string, param = {}) {
    return this.http.get(this.baseUrl + path + '.json', { headers: this.getHttpOptions(), params: param});
  }

  create(path: string, body: any) {
    return this.http.post(this.baseUrl + path + '.json', body, { headers: this.getHttpOptions() });
  }
  update(path: string, body: any) {
    return this.http.put(this.baseUrl + path + '.json', body);
  }
  destory(path: string) {
    return this.http.delete(this.baseUrl + path + '.json');
  }
  show(path: string) {
    return this.http.get(this.baseUrl + path + '.json');
  }
  navigate(path: any[], params = {}) {
    this.router.navigate(path, params);
  }
  goBack() {
    this.location.back();
  }
  errorHandle(error: HttpErrorResponse) {
    console.log(error);
    // this.errorMsg = error.error ? error.error : error.statusText;
    this.errorMsg = error;
    this.router.navigate(['bxt', 'error']);
  }
  getHttpOptions() {
    // const token = localStorage.getItem('access_token');
    return {
      // headers: new HttpHeaders({'Content-Type': 'application/json'})
      // 'Authorization': 'Bearer ' + token
    };
  }
}
