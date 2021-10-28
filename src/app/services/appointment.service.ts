import { Host, Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

import { Observable, pipe, of } from "rxjs";
import { HostInfo } from "../models/hostInfo";
import { Registration } from "../models/request/registration";
import { AuthStoreService } from "../shared/services/auth-store-service";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  isLoggedin = false;
  hostInfo: HostInfo = new HostInfo();

  constructor(
    private http: HttpClient,
    private authStoreService: AuthStoreService
  ) {}

  getAppointments(date: string | null): Observable<any> {
    console.log("srv", date);
    return this.http.get(
      this.hostInfo.defaultHostAddress +
        this.hostInfo.appointmentController +
        "?day=" +
        date
    );
  }

  getPersonalAppointments(): Observable<any> {
    return this.http.get(
      this.hostInfo.defaultHostAddress +
        this.hostInfo.appointmentController +
        "/personal?email=" +
        this.authStoreService.email
    );
  }

  bookAppointment(appointmentId: number | undefined): Observable<any> {
    return this.http.put(
      this.hostInfo.defaultHostAddress +
        this.hostInfo.appointmentController +
        "/" +
        appointmentId +
        "?userEmail=" +
        this.authStoreService.email,
      null
    );
  }
}
