import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Configuration } from "src/app/config/configuration";
import { BaseWebService } from "./base-web-service.service";
import { InterventionModel } from "../model/intervention.model";
import { CardModel } from "../model/card.model";

@Injectable({ providedIn: "root" })
export class CardWebService {
  constructor(private baseWebService: BaseWebService) {}

  getCardByUserEmail(email: string): Observable<CardModel> {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(
        Configuration.PATH_CARDS + "/user",
        {
          email,
        }
      )
    );
  }
}
