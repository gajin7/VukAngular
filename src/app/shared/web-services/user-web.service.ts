import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Configuration } from "src/app/config/configuration";
import { UserModel } from "../model/user.model";
import { BaseWebService } from "./base-web-service.service";

@Injectable({ providedIn: "root" })
export class UserWebService {
  constructor(private baseWebService: BaseWebService) {}

  getDentists(): Observable<UserModel[]> {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(Configuration.PATH_USERS, {
        userTypeId: "2",
      })
    );
  }

  getPatients(): Observable<UserModel[]> {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(Configuration.PATH_USERS, {
        userTypeId: "3",
      })
    );
  }
}
