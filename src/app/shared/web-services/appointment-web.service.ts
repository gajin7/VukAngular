import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AppointmentModel } from "src/app/shared/model/appoitment.model";
import { HostInfo } from "src/app/config/hostInfo";
import { BaseWebService } from "./base-web-service.service";

@Injectable({ providedIn: "root" })
export class AppointmentWebService {
  config: HostInfo = new HostInfo();
  constructor(private baseWebService: BaseWebService) {}

  getAppointments(date: string, dentistId: string): Observable<AppointmentModel[]> {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(
        this.config.defaultHostAddress + this.config.appointmentController,
        { day: date, dentistId }
      )
    );
  }

  getPersonalAppointments(email: string): Observable<AppointmentModel[]> {
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
            (a: AppointmentModel, b: AppointmentModel) =>
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

  createAppointments(
    dentistId: string,
    appointments: Partial<AppointmentModel>[]
  ): Observable<AppointmentModel[]> {
    return this.baseWebService.postRequest(
      this.config.defaultHostAddress + this.config.appointmentController,
      {
        Appointments: appointments.map((a) => {
          return {
            DentistID: dentistId,
            DateTimeFrom: a.DateTimeFrom,
            DateTimeTo: a.DateTimeTo,
          };
        }),
      }
    );
  }
}
