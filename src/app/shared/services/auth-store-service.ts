import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { UserModel } from "../model/user-model";

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  private readonly _user = new BehaviorSubject<UserModel | null>(null);
  readonly user$ = this._user.asObservable();

  // user
  get user(): UserModel | null {
    return this._user.getValue();
  }

  set user(data: UserModel | null) {
    this._user.next(data);
  }

  private readonly _token = new BehaviorSubject<string | null>(null);
  readonly token$ = this._token.asObservable();

  // user
  get token(): string | null {
    return this._token.getValue();
  }

  set token(data: string | null) {
    this._token.next(data);
  }

  get email(): string | null {
    if (!this.token) {
      return null;
    }
    const decodedJwtJsonData = window.atob(this.token.split(".")[1]);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.email;
  }

  get role(): string | null {
    if (!this.token) {
      return null;
    }
    const decodedJwtJsonData = window.atob(this.token.split(".")[1]);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.role;
  }
}
