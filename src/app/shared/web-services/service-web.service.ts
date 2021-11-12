import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Configuration } from "src/app/config/configuration";
import { BaseWebService } from "./base-web-service.service";
import { ToothModel } from "../model/tooth.model";
import { ServiceModel } from "../model/service.model";

@Injectable({ providedIn: "root" })
export class ServiceWebService {
  constructor(private baseWebService: BaseWebService) {}

  getServices(): Observable<Array<ServiceModel>> {
    return this.baseWebService.getRequest(Configuration.PATH_SERVICES);
  }
}
