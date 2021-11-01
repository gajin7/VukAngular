import { InterventionModel } from "./intervention.model";

export class CardModel {
  Id: number | undefined = undefined;
  PatientName: string | null | undefined = undefined;
  Interventions: InterventionModel[] = [];
}
