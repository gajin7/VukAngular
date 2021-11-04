import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BillsRoutingModule } from "./bills-routing.module";
import { BillsComponent } from "./bills.component";

@NgModule({
  imports: [CommonModule, BillsRoutingModule],
  exports: [BillsComponent],
  declarations: [BillsComponent],
  providers: [],
})
export class BillsModule {}
