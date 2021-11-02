import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { AppointmentItemModule } from "src/app/shared/components/appointment-item/appointment-item.module";
import { InterventionsRoutingModule } from "./interventions-routing.module";
import { InterventionsComponent } from "./interventions.component";

@NgModule({
  imports: [
    CommonModule,
    InterventionsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    AppointmentItemModule,
    MatSelectModule
  ],
  exports: [InterventionsComponent],
  declarations: [InterventionsComponent],
  providers: [],
})
export class IntrventionsModule {}
