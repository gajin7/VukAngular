import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { HostInfo } from "../../models/hostInfo";
import { User } from "../../models/user";
import { BaseWebService } from "./base-web-service.service";
import { Registration } from "src/app/models/request/registration";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthWebService {
  config: HostInfo = new HostInfo();

  constructor(
    private baseWebService: BaseWebService,
  ) {}

  login(user: User): Observable<any> {
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

  register(user: Registration): Observable<any> {
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
