import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { AdministrationRoutingModule } from "./administration-routing.module";
import { AdministrationComponent } from "./administration.component";

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MatListModule,
    MatTableModule,
  ],
  exports: [AdministrationComponent],
  declarations: [AdministrationComponent],
  providers: [],
})
export class AdministrationModule {}
