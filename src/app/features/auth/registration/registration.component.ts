import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { finalize, take, takeUntil } from "rxjs/operators";
import { BaseAlertService } from "src/app/shared/services/base-alert-service";
import { GlobalService } from "src/app/shared/services/global-service";
import { passwordMatch } from "src/app/shared/utils/utils";
import { AuthWebService } from "src/app/shared/web-services/auth-web.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm?: FormGroup;
  private readonly destroyEvent$ = new Subject();

  constructor(
    private authWebService: AuthWebService,
    private globalService: GlobalService,
    private baseAlert: BaseAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        FirstName: new FormControl("", Validators.required),
        LastName: new FormControl("", Validators.required),
        Email: new FormControl("", [Validators.email, Validators.required]),
        Password: new FormControl("", Validators.required),
        RepeatPassword: new FormControl("", Validators.required),
        Type: new FormControl(3, Validators.required),
      },
      passwordMatch()
    );
  }

  register(): void {
    this.globalService.activateLoader();
    this.authWebService
      .register({
        FirstName: this.registrationForm?.value.FirstName,
        LastName: this.registrationForm?.value.LastName,
        TypeId: 3,
        Email: this.registrationForm?.value.Email,
        Password: this.registrationForm?.value.Password,
      })
      .pipe(
        take(1),
        takeUntil(this.destroyEvent$),
        finalize(() => this.globalService.deactivateLoader())
      )
      .subscribe(() => {
        setTimeout(() => {
          this.router.navigate([""]);
        });
        this.baseAlert.showAlert(
          "Uspešno ste se registrovali, sada možete da se prijavite!"
        );
      });
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
