import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError as observableThrowError } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseAlertService } from "../services/base-alert-service";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private baseAlertService: BaseAlertService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(["auth"]);
        }
        this.baseAlertService.showAlert(err.message);
        return observableThrowError(err);
      })
    );
  }
}
