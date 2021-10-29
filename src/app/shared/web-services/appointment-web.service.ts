import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Appointment } from "src/app/models/appoitment";
import { HostInfo } from "src/app/models/hostInfo";
import { BaseWebService } from "./base-web-service.service";

@Injectable({ providedIn: "root" })
export class AppointmentWebService {
  config: HostInfo = new HostInfo();
  constructor(private baseWebService: BaseWebService) {}

  getAppointments(date: string, dentistId: string): Observable<Appointment[]> {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(
        this.config.defaultHostAddress + this.config.appointmentController,
        { day: date, dentistId }
      )
    );
  }

  getPersonalAppointments(email: string): Observable<Appointment[]> {
    return this.baseWebService
      .getRequest(
        this.baseWebService.constructUrlWithParams(
          this.config.defaultHostAddress +
            this.config.appointmentController +
            "/personal",
          { email }
        )
      )
      .pipe(
        map((appointments: any) =>
          appointments.sort(
            (a: Appointment, b: Appointment) =>
              new Date(b.DateTimeFrom || "").getTime() -
              new Date(a.DateTimeFrom || "").getTime()
          )
        )
      );
  }

  bookAppointment(
    appointmnetId: string | number,
    email: string
  ): Observable<void> {
    return this.baseWebService.putRequest(
      this.baseWebService.constructUrlWithParams(
        this.config.defaultHostAddress +
          this.config.appointmentController +
          "/" +
          appointmnetId,
        { userEmail: email }
      ),
      {}
    );
  }
}
