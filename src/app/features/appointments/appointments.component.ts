import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { forkJoin, Subject } from "rxjs";
import { finalize, take, takeUntil } from "rxjs/operators";
import { Appointment } from "src/app/models/appoitment";
import { UserModel } from "src/app/shared/model/user-model";
import { AuthStoreService } from "src/app/shared/services/auth-store-service";
import { GlobalService } from "src/app/shared/services/global-service";
import { AppointmentWebService } from "src/app/shared/web-services/appointment-web.service";
import { UserWebService } from "src/app/shared/web-services/user-web.service";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.scss"],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  appointments: Appointment[] = [];
  appointmentsPersonal: Appointment[] = [];
  dentists: UserModel[] = [];

  private yesterday: Date = new Date(
    new Date().valueOf() - 1000 * 60 * 60 * 24
  );

  dateValue: Date = new Date();
  dentistId: string = "";

  private readonly destroyEvent$ = new Subject();

  constructor(
    private appointmentWebService: AppointmentWebService,
    private globalService: GlobalService,
    private userWebService: UserWebService,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.globalService.activateLoader();
    forkJoin([
      this.appointmentWebService.getPersonalAppointments(
        this.authStoreService.email!
      ),
      this.userWebService.getDentists(),
    ])
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe((response: any) => {
        // this.appointments = response[0];
        this.appointmentsPersonal = response[0];
        this.dentists = response[1].Data;
        if (this.dentists.length) {
          this.dentistId = this.dentists[0].Id;
        }
        this.appointmentWebService
          .getAppointments(this.dateValue.toISOString(), this.dentistId)
          .pipe(
            take(1),
            takeUntil(this.destroyEvent$),
            finalize(() => {
              this.globalService.deactivateLoader();
            })
          )
          .subscribe((response) => (this.appointments = response));
      });
  }

  disablePastDays = (d: Date | null): boolean => {
    return !!d && d.getTime() > this.yesterday.getTime();
  };

  dataChangedHandler(): void {
    this.getAppointments(this.dateValue, this.dentistId);
  }

  getAppointments(date: Date, dentistId: string): void {
    this.globalService.activateLoader();
    this.appointmentWebService
      .getAppointments(date.toISOString(), dentistId)
      .pipe(
        take(1),
        takeUntil(this.destroyEvent$),
        finalize(() => {
          this.globalService.deactivateLoader();
        })
      )
      .subscribe((response) => {
        this.appointments = response;
      });
  }

  bookAppointment(appointment: Appointment) {
    this.globalService.activateLoader();
    this.appointmentWebService
      .bookAppointment(appointment.Id!, this.authStoreService.email!)
      .pipe(
        take(1),
        takeUntil(this.destroyEvent$),
        finalize(() => {
          this.globalService.deactivateLoader();
        })
      )
      .subscribe(() => {
        this.appointments = this.appointments.map((a) => {
          if (a.Id === appointment.Id) {
            a.Reserved = true;
          }
          return a;
        });
      });
  }

  cancelAppointment(appointment: Appointment) {
    // TODO: implement
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
