import { ServiceModel } from "./service.model";

export class BillModel {
  Id: number | undefined = undefined;
  AppointmentDate: string = "";
  TotalPrice: number = 0;
  PatientName: string = "";
  DentistName: string = "";
  Services: ServiceModel[] = [];
}
