import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AuthStoreService } from "../services/auth-store-service";
import { AuthWebService } from "../web-services/auth-web.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  redirectToNotAuthorizedPage = "auth";

  constructor(
    private authStoreService: AuthStoreService,
    private authWebService: AuthWebService,
    private router: Router
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authStoreService.user) {
      return true;
    } else {
      // implement aditional check from token
      return false;
    }
  }
}
