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
  ignoreRequests: string[] = [
    "/users/info",
    "/oauth/token",
    "/users/request-password-reset",
    "/user/forgot-password",
    "/user/register",
  ];

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
        const parsedUrl = req.url.split("?")[0];
        for (const path of this.ignoreRequests) {
          if (parsedUrl.endsWith(path)) {
            return observableThrowError(err);
          }
        }
        if (err.status === 401) {
          this.router.navigate(["auth"]);
        }
        this.baseAlertService.showAlert(err.message);
        return observableThrowError(err);
      })
    );
  }
}
