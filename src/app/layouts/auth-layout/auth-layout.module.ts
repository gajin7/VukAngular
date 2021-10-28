import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from "./auth-layout.component";
import { AuthLayoutRoutingModule } from "./auth-layout-touting.module";
import { LoginModule } from "src/app/features/auth/login/login.module";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { HeaderModule } from "src/app/shared/components/header/header.module";
import { FooterModule } from "src/app/shared/components/footer/footer.module";

@NgModule({
  declarations: [AuthLayoutComponent],
  exports: [AuthLayoutComponent],
  imports: [AuthLayoutRoutingModule, CommonModule, LoginModule, MatCardModule, MatFormFieldModule, MatIconModule, HeaderModule, FooterModule],
})
export class AuthLayoutModule {}
