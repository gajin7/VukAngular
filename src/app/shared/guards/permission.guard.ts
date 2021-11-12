import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthStoreService } from "../services/auth-store-service";
import { BaseAlertService } from "../services/base-alert-service";

@Injectable({ providedIn: "root" })
export class PermissionGuard implements CanActivate {
  redirectToNotAuthorizedPage = "";

  constructor(
    private authStoreService: AuthStoreService,
    private router: Router,
    private baseAlerService: BaseAlertService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.authStoreService.role) {
      if (route.data?.permissions?.length > 0) {
        for (const role of route.data.permissions) {
          if (role === this.authStoreService.role) {
            return true;
          }
        }
        this.handleUnauthorised();
        return false;
      }
      true;
    }
    this.handleUnauthorised();
    return false;
  }

  private handleUnauthorised(): void {
    this.router.navigate([this.redirectToNotAuthorizedPage]);
    this.baseAlerService.showAlert("You dont have access!");
  }
}
