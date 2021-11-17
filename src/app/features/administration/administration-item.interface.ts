import { Type } from "@angular/core";

export interface AdministrationItemI {
  type: Type<any>;
  displayName: string;
  internalName: string;
  url: string;
  createUrl?: string;
  paginated?: boolean;
  isDependant?: boolean;
  permanent?: boolean;
  parameters?: { key: string; value: string };
  queryParameters?: { key: string; value: string; values?: {} };
  createModel?: { [key: string]: any };
  editable?: boolean;
  goForDetails?: string;
}
