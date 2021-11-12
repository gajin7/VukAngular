import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { BaseAlertService } from "src/app/shared/services/base-alert-service";
import { passwordMatch } from "src/app/shared/utils/utils";
import { AuthWebService } from "src/app/shared/web-services/auth-web.service";
import { UserWebService } from "src/app/shared/web-services/user-web.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  token: string = "";
  invalidToken: boolean = false;
  resetPasswordForm?: FormGroup;

  private readonly destroyEvent$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baseAlertService: BaseAlertService,
    private authWebService: AuthWebService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe((values) => {
        this.token = values["token"];
        if (!this.token) {
          setTimeout(() => {
            this.baseAlertService.showAlert("Token must be provided!");
          });
          this.router.navigate([""]);
        } else {
          this.resetPasswordForm = new FormGroup(
            {
              Password: new FormControl("", Validators.required),
              RepeatPassword: new FormControl("", Validators.required),
            },
            passwordMatch()
          );
        }
      });
  }

  resetPassword(): void {
    this.authWebService
      .setNewPassowrd(this.token, {
        NewPassword: this.resetPasswordForm?.value.Password,
      })
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe(
        () => {
          this.invalidToken = false;
          this.router.navigate([""]);
          setTimeout(() => {
            this.baseAlertService.showAlert(
              "Nova lozinka je podešena! Možete se prijaviti."
            );
          });
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.invalidToken = true;
            this.baseAlertService.showAlert(
              "Token nije validan. Zahtevajte novi!"
            );
          } else {
            this.baseAlertService.showAlert(
              "Nešto je pošlo po zlu! " + error.message
            );
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
    this.destroyEvent$.complete();
  }
}
