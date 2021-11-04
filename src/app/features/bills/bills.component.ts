import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { BillModel } from "src/app/shared/model/bill.model";
import { ROLE } from "src/app/shared/model/role";
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
export class BillsComponent implements OnInit {
  patients: UserModel[] = [];
  dentists: UserModel[] = [];
  bills: BillModel[] = [];

  readonly USET_TYPE = ROLE;
  userRole: ROLE = ROLE.PATIENT;

  constructor(
    private authStoreService: AuthStoreService,
    private userWebService: UserWebService,
    private billWebService: BillWebService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authStoreService.user?.Type || ROLE.ADMIN;
    forkJoin([
      this.billWebService.getBills(),
      ...(this.userRole === ROLE.ADMIN || this.userRole === ROLE.DENTIST
        ? [this.userWebService.getPatients()]
        : []),
      ...(this.userRole === ROLE.ADMIN
        ? [this.userWebService.getDentists()]
        : []),
    ]).subscribe((response: any) => {
      this.bills = response[0];
      if (this.userRole === ROLE.ADMIN || this.userRole === ROLE.DENTIST) {
        this.patients = response[1].Data;
        if (this.userRole === ROLE.ADMIN) {
          this.dentists = response[2].Data;
        }
      }
    });
  }
}
