import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HostInfo } from "src/app/models/hostInfo";
import { UserModel } from "../model/user-model";
import { BaseWebService } from "./base-web-service.service";

@Injectable({ providedIn: "root" })
export class UserWebService {
  config: HostInfo = new HostInfo();
  constructor(private baseWebService: BaseWebService) {}

  getDentists(): Observable<UserModel[]> {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(
        this.config.defaultHostAddress + this.config.userController,
        { userTypeId: "2" }
      )
    );
  }

  getPatients(): Observable<UserModel[]> {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(
        this.config.defaultHostAddress + this.config.userController,
        { userTypeId: "3" }
      )
    );
  }
}
