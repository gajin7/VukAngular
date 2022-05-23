import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, skip, take, takeUntil } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/model/user.model';
import { BaseAlertService } from 'src/app/shared/services/base-alert-service';
import { GlobalService } from 'src/app/shared/services/global-service';
import { AuthWebService } from 'src/app/shared/web-services/auth-web.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  registrationForm?: FormGroup;
  btnDisabled$ = new BehaviorSubject<boolean>(true)
  private user$ = new BehaviorSubject<UserModel | null>(null)
  private destroyEvent$ = new Subject()

  constructor(
    private authWebService: AuthWebService,
    private globalService: GlobalService,
    private baseAlert: BaseAlertService,
  ) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        FirstName: new FormControl("", Validators.required),
        LastName: new FormControl("", Validators.required),
        Email: new FormControl(""),
      });

    this.user$.pipe(takeUntil(this.destroyEvent$)).subscribe((user) => {
      if (user && this.registrationForm) {
        this.registrationForm.setValue({
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
        })
      }
    })

    this.authWebService.getUserInfo()
      .pipe(takeUntil(this.destroyEvent$))
      .subscribe((user) => this.user$.next(user))

    this.registrationForm?.valueChanges
      .pipe(skip(1),takeUntil(this.destroyEvent$))
      .subscribe(() => {
        this.btnDisabled$.next(false)
      })
  }


  saveUser(): void {
    if (this.user$.value && this.registrationForm?.value) {
      this.globalService.activateLoader()
      this.authWebService.updateUserInfo(
        {
          ...this.user$.value,
          FirstName: this.registrationForm.value.FirstName,
          LastName: this.registrationForm.value.LastName
        }
      ).pipe(
        take(1),
        takeUntil(this.destroyEvent$),
        finalize(() => {
          this.globalService.deactivateLoader();
          this.btnDisabled$.next(true);
        })
      ).subscribe(() => {
        this.baseAlert.showAlert('Podaci su uspešno sačuvani!')
      })
    }
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next()
  }
}
