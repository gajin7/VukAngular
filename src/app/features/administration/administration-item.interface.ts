import { Type } from "@angular/core";

export interface AdministrationItemI {
  type: Type<any>;
  displayName: string;
  internalName: string;
  url: string;
}
