import { Host, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, pipe, of } from 'rxjs';
import { HostInfo } from '../models/hostInfo';
import { Registration } from '../models/request/registration';


@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  isLoggedin = false;
  hostInfo : HostInfo = new HostInfo();


  constructor(private http: HttpClient) { }


  getAppointments(date: string | null): Observable<any> { 
      console.log('srv', date);   
    return this.http.get(this.hostInfo.defaultHostAddress +  this.hostInfo.appointmentController + '?day='+date);
  }
}