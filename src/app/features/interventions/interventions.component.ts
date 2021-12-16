import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import {
  debounceTime,
  filter,
  finalize,
  take,
  takeUntil,
  tap,
} from "rxjs/operators";
import { AppointmentModel } from "src/app/shared/model/appointment.model";
import { BillModel } from "src/app/shared/model/bill.model";
import { InterventionModel } from "src/app/shared/model/intervention.model";
import { ROLE } from "src/app/shared/model/role";
import { ServiceModel } from "src/app/shared/model/service.model";
import { ToothModel } from "src/app/shared/model/tooth.model";
import { UserModel } from "src/app/shared/model/user.model";
import { AuthStoreService } from "src/app/shared/services/auth-store-service";
import { BaseAlertService } from "src/app/shared/services/base-alert-service";
import { GlobalService } from "src/app/shared/services/global-service";
import { AppointmentWebService } from "src/app/shared/web-services/appointment-web.service";
import { BillWebService } from "src/app/shared/web-services/bill-web.service";
import { CardWebService } from "src/app/shared/web-services/card-web.service";
import { InterventionWebService } from "src/app/shared/web-services/intervention-web.service";
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

  bill$: BehaviorSubject<BillModel | null> =
    new BehaviorSubject<BillModel | null>(null);
  billServices: { [key: string]: { name: string; count: number } } = {};

  cardId: number | undefined;
  dentistId: string = "";
  patientId: string = "";
  dentists: UserModel[] = [];
  selectedAppointment$: BehaviorSubject<AppointmentModel | null> =
    new BehaviorSubject<AppointmentModel | null>(null);
  interventionSelection: InterventionModel[] = [];
  discount = new FormControl("");

  readonly USER_TYPE = ROLE;
  userRole: ROLE = ROLE.PATIENT;

  private interventionsElement?: ElementRef;

  @ViewChild("interventionsListElement") set content(content: ElementRef) {
    if (content) {
      this.interventionsElement = content;
    }
  }

  constructor(
    private appointmentWebService: AppointmentWebService,
    private interventionWebService: InterventionWebService,
    private cardWebServie: CardWebService,
    private toothWebService: ToothWebService,
    private serviceWebService: ServiceWebService,
    private authStoreService: AuthStoreService,
    private globalService: GlobalService,
    private userWebService: UserWebService,
    private billWebService: BillWebService,
    private router: Router,
    private baseAlertService: BaseAlertService
  ) {}

  private readonly destroyEvent$ = new Subject();

  ngOnInit(): void {
    this.globalService.activateLoader();
    this.userRole = this.authStoreService.role as ROLE;
    if (this.userRole === ROLE.DENTIST) {
      this.dentistId = this.authStoreService.user?.Id || "";
      this.getAppointments();
    } else if (this.userRole === ROLE.PATIENT) {
      this.patientId = this.authStoreService.user?.Email || "";
      this.getInterventions(this.patientId, true);
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
        if (appointemnt) {
          this.getInterventions(appointemnt.PatientEmail?.toString() || "");
          this.getBill(appointemnt.Id || "");
          this.loadTeeth();
          this.loadServices();
          this.interventionSelection = [];
          this.discount.reset(null, { emitEvent: false });
        } else {
          this.cardId = undefined;
          this.interventions = [];
        }
      });

    this.bill$.pipe(takeUntil(this.destroyEvent$)).subscribe((bill) => {
      this.billServices = {};
      bill?.Services.forEach((service: ServiceModel) => {
        if (service.Id) {
          if (this.billServices[service.Id]) {
            this.billServices[service.Id].count++;
          } else {
            this.billServices[service.Id] = {
              name: service.Name,
              count: 1,
            };
          }
        }
      });
    });

    this.discount.valueChanges
      .pipe(
        takeUntil(this.destroyEvent$),
        tap((v) => {
          if (v < 0) this.discount.setValue(0);
          else if (v > 100) this.discount.setValue(100);
        }),
        filter((v) => v >= 0 && v <= 100),
        debounceTime(400)
      )
      .subscribe((v) => {
        if (!this.bill$.value?.Id || v === this.bill$.value?.Discount) return;
        this.billWebService
          .setDiscount(this.bill$.value?.Id, v || 0)
          .pipe(takeUntil(this.destroyEvent$))
          .subscribe((r) => {
            this.bill$.next(r);
          });
      });
  }

  getInterventions(email: string, skipUncompeted?: boolean): void {
    this.globalService.activateLoader();
    this.cardWebServie
      .getCardByUserEmail(email)
      .pipe(
        take(1),
        takeUntil(this.destroyEvent$),
        finalize(() => this.globalService.deactivateLoader())
      )
      .subscribe((card) => {
        this.cardId = card.Id;
        if (skipUncompeted) {
          this.interventions = card.Interventions.filter((x) => x.IsExecuted);
        } else {
          this.interventions = card.Interventions;
        }
      });
  }

  dataChangedHandler(): void {
    this.getAppointments();
    this.selectedAppointment$.next(null);
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

  getBill(appointmentId: string | number): void {
    this.billWebService
      .getBillByAppointment(appointmentId)
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe((v) => {
        this.discount.setValue(v.Discount, { emitEvent: false });
        this.bill$.next(v);
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

  createIntervenion(intervention: Partial<InterventionModel>): void {
    if (this.cardId && intervention.ServiceId && intervention.ToothId) {
      this.globalService.activateLoader();
      this.interventionWebService
        .createIntervention(
          this.cardId,
          intervention.ServiceId,
          intervention.ToothId
        )
        .pipe(
          take(1),
          takeUntil(this.destroyEvent$),
          finalize(() => this.globalService.deactivateLoader())
        )
        .subscribe((interv) => {
          this.interventions.push(interv);
          this.interventionSelection = [interv];
          setTimeout(() => {
            if (this.interventionsElement) {
              this.interventionsElement.nativeElement.scrollTop =
                this.interventionsElement.nativeElement.scrollHeight;
            }
          });
        });
    }
  }

  completeIntervention(intervention: InterventionModel): void {
    if (
      intervention.Id &&
      this.dentistId &&
      this.selectedAppointment$.value?.Id
    ) {
      this.globalService.activateLoader();
      this.interventionWebService
        .completeIntervention(
          intervention.Id,
          parseInt(this.dentistId),
          this.selectedAppointment$.value?.Id
        )
        .pipe(
          take(1),
          takeUntil(this.destroyEvent$),
          finalize(() => this.globalService.deactivateLoader())
        )
        .subscribe(() => {
          intervention.IsExecuted = true;
          this.getBill(this.selectedAppointment$.value?.Id || "");
        });
    }
  }

  showBillForAppointment(): void {
    this.router.navigate(["bills"], {
      queryParams: { appointmentId: this.selectedAppointment$.value?.Id },
    });
  }

  sendBillToEmail(): void {
    if (!this.bill$.value?.AppointmentId) return;
    this.globalService.activateLoader();
    this.billWebService
      .requestBillInEmail(this.bill$.value.AppointmentId)
      .pipe(
        take(1),
        takeUntil(this.destroyEvent$),
        finalize(() => this.globalService.deactivateLoader())
      )
      .subscribe(() => {
        this.baseAlertService.showAlert(
          "Račun uspešno poslat na korisnikovu e-mail adresu!"
        );
      });
  }

  setDiscount(discount: number): void {}

  markAsMissed(): void {
    this.appointmentWebService
      .setMissedAppointment(
        this.selectedAppointment$.value?.Id?.toLocaleString() || ""
      )
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe(() => {
        this.appointments = this.appointments.map((a) => {
          if (a.Id === this.selectedAppointment$.value?.Id) {
            a.NotCome = true;
          }
          return a;
        });
      });
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
