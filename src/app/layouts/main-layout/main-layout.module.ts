import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MainLayoutComponent } from "./main-layout.component";
import { FooterModule } from "src/app/shared/components/footer/footer.module";
import { HeaderModule } from "src/app/shared/components/header/header.module";
import { SideMenuModule } from "src/app/shared/components/side-menu/side-menu.module";

@NgModule({
  declarations: [MainLayoutComponent],
  exports: [MainLayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    SideMenuModule,
    RouterModule,
  ],
})
export class MainLayoutModule {}
