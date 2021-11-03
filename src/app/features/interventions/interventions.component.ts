import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { finalize, take, takeUntil } from "rxjs/operators";
import { AppointmentModel } from "src/app/shared/model/appointment.model";
import { InterventionModel } from "src/app/shared/model/intervention.model";
import { ROLE } from "src/app/shared/model/role";
import { ServiceModel } from "src/app/shared/model/service.model";
import { ToothModel } from "src/app/shared/model/tooth.model";
import { UserModel } from "src/app/shared/model/user.model";
import { AuthStoreService } from "src/app/shared/services/auth-store-service";
import { GlobalService } from "src/app/shared/services/global-service";
import { AppointmentWebService } from "src/app/shared/web-services/appointment-web.service";
import { CardWebService } from "src/app/shared/web-services/card-web.service";
import { ServiceWebService } from "src/app/shared/web-services/service-web.service";
import { ToothWebService } from "src/app/shared/web-services/tooth-web.service";
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
  teeth: ToothModel[] = [];
  services: ServiceModel[] = [];

  dentistId: string = "";
  dentists: UserModel[] = [];
  selectedAppointment$: BehaviorSubject<AppointmentModel | null> =
    new BehaviorSubject<AppointmentModel | null>(null);
  intrventionSelection: InterventionModel[] = [];

  readonly USET_TYPE = ROLE;
  userRole: ROLE = ROLE.PATIENT;

  constructor(
    private appointmentWebService: AppointmentWebService,
    private cardWebServie: CardWebService,
    private toothWebService: ToothWebService,
    private serviceWebService: ServiceWebService,
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

    this.selectedAppointment$
      .pipe(takeUntil(this.destroyEvent$))
      .subscribe((appointemnt: AppointmentModel | null) => {
        this.globalService.activateLoader();
        if (appointemnt) {
          this.cardWebServie
            .getCardByUserEmail(appointemnt.PatientEmail?.toString() || "")
            .pipe(
              take(1),
              takeUntil(this.destroyEvent$),
              finalize(() => this.globalService.deactivateLoader())
            )
            .subscribe((card) => {
              this.interventions = card.Interventions;
              this.loadTeeth();
              this.loadServices();
            });
        } else {
          this.interventions = [];
        }
      });
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
      .subscribe((response) => {
        this.appointments = response;
      });
  }

  loadTeeth(): void {
    this.toothWebService
      .getTeeth()
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe((teeth) => (this.teeth = teeth));
  }

  loadServices(): void {
    this.serviceWebService
      .getServices()
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe((services) => (this.services = services));
  }

  appointmentSelected(appointemnt: AppointmentModel): void {
    if (appointemnt !== this.selectedAppointment$.value) {
      this.selectedAppointment$.next(appointemnt);
    }
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
