import { Host, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, pipe, of } from 'rxjs';
import { HostInfo } from '../models/hostInfo';
import { Registration } from '../models/request/registration';


@Injectable({
  providedIn: 'root',
})
export class CardService {
  isLoggedin = false;
  hostInfo : HostInfo = new HostInfo();


  constructor(private http: HttpClient) { }

  getCardByUserEmail(): Observable<any> { 
    console.log('srv', );   
  return this.http.get(this.hostInfo.defaultHostAddress +  this.hostInfo.cardController + '/user?email='+sessionStorage.email);
}
}