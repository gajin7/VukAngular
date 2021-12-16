import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Configuration } from "src/app/config/configuration";
import { BaseWebService } from "./base-web-service.service";
import { BillModel } from "../model/bill.model";

@Injectable({ providedIn: "root" })
export class BillWebService {
  constructor(private baseWebService: BaseWebService) {}

  getBillsByUsers(queryParams: {
    [key: string]: number | string;
  }): Observable<BillModel[]> {
    return this.baseWebService.getRequest(
      this.baseWebService.constructUrlWithParams(
        Configuration.PATH_BILLS,
        queryParams
      )
    );
  }

  getBillByAppointment(appointmentId: number | string): Observable<BillModel> {
    return this.baseWebService.getRequest(
      Configuration.PATH_BILLS + "/" + appointmentId
    );
  }

  requestBillInEmail(appointmentId: number | string): Observable<BillModel> {
    return this.baseWebService.putRequest(
      Configuration.PATH_BILLS + "/email/" + appointmentId,
      {}
    );
  }

  setDiscount(
    appointmentId: number | string,
    discount: number
  ): Observable<BillModel> {
    return this.baseWebService.patchRequest<BillModel, object>(
      this.baseWebService.constructUrlWithParams(
        Configuration.PATH_BILLS + "/discount",
        { appointmentId, discount }
      ),
      {},
      BillModel
    );
  }
}
