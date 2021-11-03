import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Configuration } from "src/app/config/configuration";
import { BaseWebService } from "./base-web-service.service";
import { ToothModel } from "../model/tooth.model";

@Injectable({ providedIn: "root" })
export class ToothWebService {
  constructor(private baseWebService: BaseWebService) {}

  getTeeth(): Observable<Array<ToothModel>> {
    return this.baseWebService.getRequest(Configuration.PATH_TEETH);
  }
}
