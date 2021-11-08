import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "./auth-layout.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { HeaderModule } from "src/app/shared/components/header/header.module";
import { FooterModule } from "src/app/shared/components/footer/footer.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AuthLayoutComponent],
  exports: [AuthLayoutComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    HeaderModule,
    FooterModule,
    RouterModule,
  ],
})
export class AuthLayoutModule {}
