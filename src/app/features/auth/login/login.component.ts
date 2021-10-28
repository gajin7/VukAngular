import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { AuthStoreService } from "src/app/shared/services/auth-store-service";
import { AuthWebService } from "src/app/shared/web-services/auth-web.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnDestroy {
  isLoginFailed: boolean = false;
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });
  hide = true;

  private readonly $destroySubject = new Subject();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public authWebService: AuthWebService,
    private authStoreService: AuthStoreService
  ) {}

  login() {
    this.authWebService
      .login(this.loginForm.value)
      .pipe(take(1), takeUntil(this.$destroySubject))
      .subscribe(
        (res: any) => {
          if (res.access_token) {
            this.authStoreService.token = res.access_token;

            // Implement get current user
            this.authWebService
              .getUserInfo(this.authStoreService.email || "")
              .subscribe(
                (userData) => {
                  this.authStoreService.user = {
                    email: userData.Email,
                    firstName: userData.FirstName,
                    id: userData.Id,
                    lastAppoitment: userData.LastAppoitment,
                    lastName: userData.LastName,
                    name: userData.Name,
                    suggestedAppoitment: userData.SuggestedAppoitment,
                    type: userData.Type,
                  };
                  this.router.navigate([""]);
                },
                () => {
                  this.authStoreService.token = null;
                  this.authStoreService.user = null;
                }
              );
          }
        },
        () => {
          this.authStoreService.token = null;
          this.authStoreService.user = null;
        }
      );
  }

  ngOnDestroy(): void {
    this.$destroySubject.next();
  }
}
