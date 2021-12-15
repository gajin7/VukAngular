import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AppointmentModel } from "src/app/shared/model/appointment.model";
import { Configuration } from "src/app/config/configuration";
import { BaseWebService } from "./base-web-service.service";

@Injectable({ providedIn: "root" })
export class AppointmentWebService {
  constructor(private baseWebService: BaseWebService) {}

  getAppointments(
    date: string,
    dentistId: string
  ): Observable<AppointmentModel[]> {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(
        Configuration.PATH_APPOINTMENTS,
        { day: date, dentistId }
      )
    );
  }

  getPersonalAppointments(email: string): Observable<AppointmentModel[]> {
    return this.baseWebService
      .getRequest(
        this.baseWebService.constructUrlWithParams(
          Configuration.PATH_APPOINTMENTS + "/personal",
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
    appointmentId: string | number,
    email: string
  ): Observable<void> {
    return this.baseWebService.putRequest(
      this.baseWebService.constructUrlWithParams(
        Configuration.PATH_APPOINTMENTS + "/" + appointmentId,
        { userEmail: email }
      ),
      {}
    );
  }

  createAppointments(
    dentistId: string,
    appointments: Partial<AppointmentModel>[]
  ): Observable<AppointmentModel[]> {
    return this.baseWebService.postRequest(Configuration.PATH_APPOINTMENTS, {
      Appointments: appointments.map((a) => {
        return {
          DentistID: dentistId,
          DateTimeFrom: a.DateTimeFrom,
          DateTimeTo: a.DateTimeTo,
        };
      }),
    });
  }

  setMissedAppointment(appointmentId: string): Observable<void> {
    return this.baseWebService.patchRequest(
      Configuration.PATH_APPOINTMENTS + "/" + appointmentId,
      {}
    );
  }
}
