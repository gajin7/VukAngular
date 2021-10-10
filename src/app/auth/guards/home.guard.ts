import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    

  if (sessionStorage.role == null || sessionStorage.role === '') {
      return true;
  }
  if (sessionStorage.role === 'Patient') {
      this.router.navigate(['patient']);
      return false;
  }
  else {
      this.router.navigate(['']);
      return false;
    }
  }

  

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}
