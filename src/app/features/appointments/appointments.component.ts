import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { forkJoin, Subject } from "rxjs";
import { finalize, take, takeUntil } from "rxjs/operators";
import { AppointmentModel } from "src/app/shared/model/appointment.model";
import { CreateAppointmentPopupComponent } from "src/app/shared/components/create-appointment-popup/create-appointment-popup.component";
import { ROLE } from "src/app/shared/model/role";
import { UserModel } from "src/app/shared/model/user.model";
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
  appointments: AppointmentModel[] = [];
  appointmentsPersonal: AppointmentModel[] = [];
  dentists: UserModel[] = [];
  patients: UserModel[] = [];

  readonly USER_TYPE = ROLE;
  userRole: ROLE = ROLE.PATIENT;

  private yesterday: Date = new Date(
    new Date().valueOf() - 1000 * 60 * 60 * 24
  );

  dateValue: Date = new Date();
  dentistId: string = "";
  patientEmail: string = "";

  private readonly destroyEvent$ = new Subject();

  constructor(
    private appointmentWebService: AppointmentWebService,
    private globalService: GlobalService,
    private userWebService: UserWebService,
    private authStoreService: AuthStoreService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.globalService.activateLoader();
    this.userRole = this.authStoreService.role as ROLE;
    if (this.userRole === ROLE.PATIENT) {
      this.patientEmail = this.authStoreService.email!;
    }
    forkJoin([
      this.appointmentWebService.getPersonalAppointments(this.authStoreService.email!),
      this.userWebService.getDentists(),
      ...(this.userRole === ROLE.ADMIN
        ? [this.userWebService.getPatients()]
        : []),
    ])
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe((response: any) => {
        this.appointmentsPersonal = response[0];
        this.dentists = response[1].Data;
        if (this.userRole === ROLE.ADMIN) {
          this.patients = response[2].Data;
          if (this.patients.length) {
            this.patientEmail = this.patients[0].Email;
            this.getPersonalAppoitnemnts();
          }
        }
        if (this.dentists.length) {
          this.dentistId =
            this.userRole === ROLE.DENTIST
              ? this.authStoreService.user!.Id
              : this.dentists[0].Id;
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
    return !!d && d.getDay() > 0 && d.getTime() > this.yesterday.getTime();
  };

  dataChangedHandler(): void {
    this.getAppointments(this.dateValue, this.dentistId);
  }

  patientChanged(): void {
    this.getPersonalAppoitnemnts();
  }

  getPersonalAppoitnemnts(): void {
    this.appointmentWebService
      .getPersonalAppointments(this.patientEmail)
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe((v) => (this.appointmentsPersonal = v));
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

  bookAppointment(appointment: AppointmentModel) {
    this.globalService.activateLoader();
    this.appointmentWebService
      .bookAppointment(
        appointment.Id!,
        this.userRole === ROLE.ADMIN
          ? this.patientEmail
          : this.authStoreService.email!
      )
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
        this.getPersonalAppoitnemnts();
      });
  }

  cancelAppointment(appointment: AppointmentModel) {
    // TODO: implement
  }

  openCreateDialog(auto: boolean = false): void {
    this.matDialog
      .open(CreateAppointmentPopupComponent, {
        width: "400px",
        data: {
          generateAuto: auto,
          currentDay: this.dateValue,
          dentistId: this.dentistId,
        },
      })
      .afterClosed()
      .subscribe((v) => {
        if (v) {
          this.getAppointments(this.dateValue, this.dentistId);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
    this.destroyEvent$.complete();
  }
}
