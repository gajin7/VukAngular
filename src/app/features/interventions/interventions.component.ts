import { Component, OnDestroy, OnInit } from "@angular/core";
import { forkJoin, Subject } from "rxjs";
import { finalize, take, takeUntil } from "rxjs/operators";
import { AppointmentModel } from "src/app/shared/model/appointment.model";
import { InterventionModel } from "src/app/shared/model/intervention.model";
import { ROLE } from "src/app/shared/model/role";
import { UserModel } from "src/app/shared/model/user.model";
import { AuthStoreService } from "src/app/shared/services/auth-store-service";
import { GlobalService } from "src/app/shared/services/global-service";
import { AppointmentWebService } from "src/app/shared/web-services/appointment-web.service";
import { UserWebService } from "src/app/shared/web-services/user-web.service";

@Component({
  selector: "app-interventions",
  templateUrl: "./interventions.component.html",
  styleUrls: ["./interventions.component.scss"],
})
export class InterventionsComponent implements OnInit, OnDestroy {
  dateValue: Date = new Date();
  appointments: AppointmentModel[] = [];
  interventions: InterventionModel[] = [];

  dentistId: string = "";
  dentists: UserModel[] = [];

  readonly USET_TYPE = ROLE;
  userRole: ROLE = ROLE.PATIENT;

  constructor(
    private appointmentWebService: AppointmentWebService,
    private authStoreService: AuthStoreService,
    private globalService: GlobalService,
    private userWebService: UserWebService
  ) {}

  private readonly destroyEvent$ = new Subject();

  ngOnInit(): void {
    this.globalService.activateLoader();
    this.userRole = this.authStoreService.role as ROLE;
    if (this.userRole === ROLE.DENTIST) {
      this.dentistId = this.authStoreService.user?.Id || "";
      this.getAppointments();
    } else {
      this.userWebService
        .getDentists()
        .pipe(take(1), takeUntil(this.destroyEvent$))
        .subscribe(
          (value: any) => {
            this.dentists = value.Data;
            this.dentistId = this.dentists[0].Id;
            this.getAppointments();
          },
          () => {
            this.globalService.deactivateLoader();
          }
        );
    }
  }

  dataChangedHandler(): void {
    this.getAppointments();
  }

  getAppointments(): void {
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
  }

  appointmentSelected(appointemnt: AppointmentModel): void {
    console.log(appointemnt);
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
