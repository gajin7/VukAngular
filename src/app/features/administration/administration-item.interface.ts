import { Type } from "@angular/core";

export interface AdministrationItemI {
  type: Type<any>;
  displayName: string;
  internalName: string;
  url: string;
  paginated?: boolean;
  isDependant?: boolean;
  parameters?: { key: string; value: string };
  queryParameters?: { key: string; value: string };
}
