import { HttpHeaders } from "@angular/common/http";

export class Configuration {
  static readonly HOST = "http://localhost:54739";

  static readonly HTTP_OPTIONS_JSON = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  static readonly PATH_TOKEN = Configuration.HOST + "/oauth/token";

  static readonly PATH_USERS = Configuration.HOST + "/users";
  static readonly PATH_USERS_CREATE = Configuration.HOST + "/users/register";
  static readonly PATH_APPOINTMENTS = Configuration.HOST + "/appointments";
  static readonly PATH_CARDS = Configuration.HOST + "/cards";
  static readonly PATH_TEETH = Configuration.HOST + "/teeth";
  static readonly PATH_BILLS = Configuration.HOST + "/bills";
  static readonly PATH_SERVICES = Configuration.HOST + "/services";
  static readonly PATH_SERVICE_TYPES = Configuration.HOST + "/service-types";
  static readonly PATH_INTERVENTION = Configuration.HOST + "/interventions";
}
