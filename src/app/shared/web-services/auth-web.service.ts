import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { HostInfo } from "../../config/hostInfo";
import { BaseWebService } from "./base-web-service.service";

@Injectable({
  providedIn: "root",
})
export class AuthWebService {
  config: HostInfo = new HostInfo();

  constructor(
    private baseWebService: BaseWebService,
  ) {}

  login(user: any): Observable<any> {
    return this.baseWebService.postRequest(
      this.config.defaultHostAddress + this.config.tokenPath,
      `username=` +
        user.username +
        `&password=` +
        user.password +
        `&grant_type=password`,
      { headers: { "Content-type": "x-www-form-urlencoded" } }
    );
  }

  logout(): Observable<any> {
    return this.baseWebService.getRequest(
      this.config.defaultHostAddress + this.config.userController + "/logout"
    );
  }

  // TODO: create model for registration
  register(user: any): Observable<any> {
    return this.baseWebService.postRequest(
      this.config.defaultHostAddress + this.config.userController + "/register",
      user
    );
  }

  getUserInfo(): Observable<any> {
    return this.baseWebService.getRequest(
      this.config.defaultHostAddress + this.config.userController + '/info'
    );
  }
}
