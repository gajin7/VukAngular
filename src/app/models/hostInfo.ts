import { HttpHeaders } from "@angular/common/http";

export class HostInfo {
  defaultHostAddress: string = "https://localhost:44344";
  tokenPath: string = "/oauth/token";

  httpOptionsJson = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  userController: string = "/users";
  appointmentController: string = "/appointments";
  cardController: string = "/cards";
}
