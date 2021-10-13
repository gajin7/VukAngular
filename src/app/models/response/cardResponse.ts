import { InterventionResponse } from "./interventionResponse";

export class SingleCardResponse {
    Id: number | undefined;
    PatientName: string | null  | undefined;
    Interventions: Array<InterventionResponse> | undefined;
  }

