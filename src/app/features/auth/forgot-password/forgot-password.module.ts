import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ForgetPasswordRoutingModule } from "./forgot-password-routing.module";

import { ForgotPasswordComponent } from "./forgot-password.component";

@NgModule({
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [ForgotPasswordComponent],
  declarations: [ForgotPasswordComponent],
  providers: [],
})
export class ForgotPasswordModule {}
