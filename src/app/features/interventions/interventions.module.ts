import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InterventionsRoutingModule } from "./interventions-routing.module";
import { InterventionsComponent } from "./interventions.component";

@NgModule({
  imports: [CommonModule, InterventionsRoutingModule],
  exports: [InterventionsComponent],
  declarations: [InterventionsComponent],
  providers: [],
})
export class IntrventionsModule {}
