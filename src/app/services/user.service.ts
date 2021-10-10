import { Host, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, pipe, of } from 'rxjs';
import { HostInfo } from '../models/hostInfo';
import { Registration } from '../models/request/registration';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedin = false;
  hostInfo : HostInfo = new HostInfo();


  constructor(private http: HttpClient) { }

  register(user: Registration): Observable<any> {
    return this.http.post(this.hostInfo.defaultHostAddress +  this.hostInfo.userController + '/register',user);
  }

  getUserInfo(email: string): Observable<any> {    
    return this.http.get(this.hostInfo.defaultHostAddress +  this.hostInfo.userController + '/info?email='+email);
  }
}