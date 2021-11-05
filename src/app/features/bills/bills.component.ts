import { Component, OnDestroy, OnInit } from "@angular/core";
import { forkJoin, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { BillModel } from "src/app/shared/model/bill.model";
import { ROLE } from "src/app/shared/model/role";
import { ServiceModel } from "src/app/shared/model/service.model";
import { UserModel } from "src/app/shared/model/user.model";
import { AuthStoreService } from "src/app/shared/services/auth-store-service";
import { AuthWebService } from "src/app/shared/web-services/auth-web.service";
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

  constructor(
    private authStoreService: AuthStoreService,
    private userWebService: UserWebService,
    private billWebService: BillWebService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authStoreService.user?.Type || ROLE.ADMIN;
    forkJoin({
      bills: this.billWebService.getBills(),
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

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
