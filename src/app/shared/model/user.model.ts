import { ROLE } from "./role";

export class UserModel {
  Id: string = "";
  Email: string = "";
  FirstName: string = "";
  LastName: string = "";
  Name: string = "";
  Type: ROLE = ROLE.UNAUTHORIZED;
  LastAppointment: string = "";
  SuggestedAppointment: string = "";
}
