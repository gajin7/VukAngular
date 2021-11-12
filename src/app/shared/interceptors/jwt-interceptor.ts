import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthStoreService } from "../services/auth-store-service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authStoreService: AuthStoreService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let jwt = localStorage.jwt;
    if (jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + jwt,
        },
      });
    }
    return next.handle(req);
  }
}
