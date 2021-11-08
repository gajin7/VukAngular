import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Subject } from "rxjs";
import { finalize, take, takeUntil } from "rxjs/operators";
import { BaseAlertService } from "src/app/shared/services/base-alert-service";
import { GlobalService } from "src/app/shared/services/global-service";
import { AuthWebService } from "src/app/shared/web-services/auth-web.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
  providers: [FormBuilder],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  emailForm?: FormGroup;
  private readonly destroyEvent$ = new Subject();
  emailSent: boolean = false;

  constructor(
    private authWebService: AuthWebService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      Email: new FormControl("", [Validators.email, Validators.required]),
    });
  }

  sendEmail(): void {
    this.globalService.activateLoader();
    this.authWebService
      .forgotPassword(this.emailForm?.value.Email)
      .pipe(
        take(1),
        takeUntil(this.destroyEvent$),
        finalize(() => this.globalService.deactivateLoader)
      )
      .subscribe(() => {
        this.emailSent = true;
      });
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
