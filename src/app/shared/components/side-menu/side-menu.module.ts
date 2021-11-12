import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideMenuComponent } from "./side-menu.component";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { FooterModule } from "../footer/footer.module";

@NgModule({
  declarations: [SideMenuComponent],
  imports: [CommonModule, RouterModule, MatIconModule, FooterModule],
  exports: [SideMenuComponent],
  providers: [],
})
export class SideMenuModule {}
