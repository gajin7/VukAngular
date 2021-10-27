import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from "./main-layout.component";
import { MainLayoutRoutingModule } from "./main-layout-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { HeaderModule } from "src/app/shared/components/header/header.module";
import { FooterModule } from "src/app/shared/components/footer/footer.module";

@NgModule({
  declarations: [MainLayoutComponent],
  exports: [MainLayoutComponent],
  imports: [MainLayoutRoutingModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule, HeaderModule, FooterModule],
})
export class MainLayoutModule {}
