import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { MatExpansionPanel } from "@angular/material/expansion";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, Subject } from "rxjs";
import { finalize, take, takeUntil } from "rxjs/operators";
import { Configuration } from "src/app/config/configuration";
import { BillModel } from "src/app/shared/model/bill.model";
import { ROLE } from "src/app/shared/model/role";
import { ServiceModel } from "src/app/shared/model/service.model";
import { UserModel } from "src/app/shared/model/user.model";
import { AuthStoreService } from "src/app/shared/services/auth-store-service";
import { BaseAlertService } from "src/app/shared/services/base-alert-service";
import { GlobalService } from "src/app/shared/services/global-service";
import { BillWebService } from "src/app/shared/web-services/bill-web.service";
import { UserWebService } from "src/app/shared/web-services/user-web.service";

@Component({
  selector: "app-bills",
  templateUrl: "./bills.component.html",
  styleUrls: ["./bills.component.scss"],
})
export class BillsComponent implements OnInit, OnDestroy {
  patients: UserModel[] = [];
  dentists: UserModel[] = [];
  bills: BillModel[] = [];

  readonly USER_TYPE = ROLE;
  userRole: ROLE = ROLE.PATIENT;

  readonly destroyEvent$ = new Subject();

  patient: UserModel | undefined;
  dentist: UserModel | undefined;
  totalPrice: number = 0;

  appointmentRouteId: number | undefined;
  billFromRoute: BillModel | undefined;

  private billsList?: ElementRef;
  @ViewChild("billsList") set content(content: ElementRef) {
    if (content) {
      this.billsList = content;
    }
  }

  private billsItems?: QueryList<MatExpansionPanel>;
  @ViewChildren("billsItems") set contents(
    content: QueryList<MatExpansionPanel>
  ) {
    if (content) {
      this.billsItems = content;
    }
  }

  constructor(
    private authStoreService: AuthStoreService,
    private userWebService: UserWebService,
    private billWebService: BillWebService,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private baseAlertService: BaseAlertService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.appointmentRouteId = parseInt(params["appointmentId"]);
    });
    this.userRole = this.authStoreService.user?.Type || ROLE.ADMIN;
    if (this.userRole === ROLE.DENTIST) {
      this.dentist = this.authStoreService.user || undefined;
    } else if (this.userRole === ROLE.PATIENT) {
      this.patient = this.authStoreService.user || undefined;
    }
    forkJoin({
      bills: this.billWebService.getBillsByUsers({
        ...(this.dentist ? { dentistId: this.dentist.Id } : {}),
        ...(this.patient ? { patientId: this.patient.Id } : {}),
      }),
      ...(this.userRole === ROLE.ADMIN || this.userRole === ROLE.DENTIST
        ? { patients: this.userWebService.getPatients() }
        : {}),
      ...(this.userRole === ROLE.ADMIN || this.userRole === ROLE.PATIENT
        ? { dentists: this.userWebService.getDentists() }
        : {}),
    })
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe((response: any) => {
        this.bills = response.bills.filter(
          (b: BillModel) => b.PatientName != null
        );

        this.billFromRoute = this.bills.find(
          (b: BillModel) => b.AppointmentId === this.appointmentRouteId
        );

        setTimeout(() => {
          if (this.billFromRoute && this.billsList) {
            const index = this.bills.indexOf(this.billFromRoute);
            if (index > 0) {
              this.billsList.nativeElement.scrollTop =
                68 * this.bills.indexOf(this.billFromRoute);
              if (this.billFromRoute.Services.length) {
                this.billsItems?.get(index)?.toggle();
              }
            }
          }
        });

        this.updatePrices();

        if (this.userRole === ROLE.ADMIN || this.userRole === ROLE.DENTIST) {
          this.patients = response.patients.Data;
        }
        if (this.userRole === ROLE.ADMIN || this.userRole === ROLE.PATIENT) {
          this.dentists = response.dentists.Data;
        }
      });
  }

  filterActivated(): void {
    setTimeout(() => {
      this.billWebService
        .getBillsByUsers({
          ...(this.dentist ? { dentistId: this.dentist.Id } : {}),
          ...(this.patient ? { patientId: this.patient.Id } : {}),
        })
        .pipe(take(1), takeUntil(this.destroyEvent$))
        .subscribe((response) => {
          this.bills = response.filter((b: BillModel) => b.PatientName != null);
          this.updatePrices();
        });
    });
  }

  updatePrices(): void {
    this.bills.forEach(
      (b: BillModel) =>
        (b.TotalPrice = b.Services.map((x: ServiceModel) => x.Price).reduce(
          (a: number, b: number) => a + b,
          0
        ))
    );

    this.totalPrice = this.bills
      .map((x: BillModel) => x.TotalPrice)
      .reduce((a: number, b: number) => a + b, 0);
  }

  downloadPDFUrl(appointmentId: number | undefined): string {
    return Configuration.PATH_BILLS + "/pdf/" + appointmentId;
  }

  sendBillToEmail(e: Event, appointmentId?: number): void {
    if (!appointmentId) return;
    e.stopPropagation();
    this.globalService.activateLoader();
    this.billWebService
      .requestBillInEmail(appointmentId)
      .pipe(
        take(1),
        takeUntil(this.destroyEvent$),
        finalize(() => this.globalService.deactivateLoader())
      )
      .subscribe(() => {
        this.baseAlertService.showAlert(
          `Račun uspešno poslat na ${
            this.userRole === ROLE.PATIENT ? "Vašu" : "korisnikovu"
          } e-mail adresu!`
        );
      });
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
