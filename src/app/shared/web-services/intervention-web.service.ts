import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Configuration } from "src/app/config/configuration";
import { BaseWebService } from "./base-web-service.service";
import { InterventionModel } from "../model/intervention.model";
import { CardModel } from "../model/card.model";

@Injectable({ providedIn: "root" })
export class InterventionWebService {
  constructor(private baseWebService: BaseWebService) {}

  createIntervention(
    CardId: number,
    ServiceId: number,
    ToothId: number
  ): Observable<InterventionModel> {
    return this.baseWebService.postRequest(Configuration.PATH_INTERVENTION, {
      CardId,
      ServiceId,
      ToothId,
    });
  }

  completeIntervention(
    interventionId: number,
    dentistId: number,
    appointmentId: number
  ): Observable<void> {
    return this.baseWebService.putRequest(
      this.baseWebService.constructUrlWithParams(
        Configuration.PATH_INTERVENTION + "/" + interventionId,
        {
          dentistId,
          appointmentId,
        }
      ),
      {}
    );
  }
}
