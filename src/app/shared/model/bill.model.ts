import { ServiceModel } from "./service.model";

export class BillModel {
  Id: number | undefined = undefined;
  AppointmentDate: string = "";
  TotalPrice: 0 = 0;
  PatientName: string = "";
  Services: ServiceModel[] = [];
}
