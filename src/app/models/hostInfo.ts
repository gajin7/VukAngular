import { HttpHeaders } from "@angular/common/http";

export class HostInfo {
    defaultHostAddress: string = "http://localhost:64334";
    apiPrefix : string = "/api";
    tokenPath : string = "/oauth/token";
    
    httpOptionsJson = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  userController: string = '';
  }