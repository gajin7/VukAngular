import { ServiceModel } from "./service.model";

export class BillModel {
  AppointmentDate: string = "";
  TotalPrice: 0 = 0;
  PatientName: string = "";
  Services: ServiceModel[] = [];
}
