import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Configuration } from "../../config/configuration";
import { BaseWebService } from "./base-web-service.service";

@Injectable({
  providedIn: "root",
})
export class AuthWebService {
  constructor(private baseWebService: BaseWebService) {}

  login(user: any): Observable<any> {
    return this.baseWebService.postRequest(
      Configuration.PATH_TOKEN,
      `username=` +
        user.username +
        `&password=` +
        user.password +
        `&grant_type=password`,
      { headers: { "Content-type": "x-www-form-urlencoded" } }
    );
  }

  logout(): Observable<any> {
    return this.baseWebService.getRequest(Configuration.PATH_USERS + "/logout");
  }

  // TODO: create model for registration
  register(user: any): Observable<any> {
    return this.baseWebService.postRequest(
      Configuration.PATH_USERS + "/register",
      user
    );
  }

  getUserInfo(): Observable<any> {
    return this.baseWebService.getRequest(Configuration.PATH_USERS + "/info");
  }

  forgotPassword(email: string) {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(
        Configuration.PATH_USERS + "/forgot-password",
        {
          email,
        }
      )
    );
  }

  resetPassword(token: string, data: any) {
    return this.baseWebService.postRequest(
      this.baseWebService.constructUrlWithParams(
        Configuration.PATH_USERS + "/reset-password",
        {
          token,
        }
      ),
      data
    );
  }
}
