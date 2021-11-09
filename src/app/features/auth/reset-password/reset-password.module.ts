import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ResetPasswordRoutingModule } from "./reset-password-routing.module";

import { ResetPasswordComponent } from "./reset-password.component";

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ResetPasswordComponent],
  declarations: [ResetPasswordComponent],
  providers: [],
})
export class ResetPasswordModule {}
