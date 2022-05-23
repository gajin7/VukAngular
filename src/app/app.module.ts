import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { AuthWebService } from "./shared/web-services/auth-web.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./shared/interceptors/jwt-interceptor";
import { AgmCoreModule } from "@agm/core";
import { HttpErrorsInterceptor } from "./shared/interceptors/http-errors.interceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MainLayoutModule } from "./layouts/main-layout/main-layout.module";
import { AuthLayoutModule } from "./layouts/auth-layout/auth-layout.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSnackBarModule,
    MainLayoutModule,
    AuthLayoutModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "",
    }),
  ],
  providers: [
    AuthWebService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
