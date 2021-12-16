import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AppointmentItemModule } from "src/app/shared/components/appointment-item/appointment-item.module";
import { CreateEditInterventionModule } from "src/app/shared/components/create-edit-intervention/create-edit-intervention.module";
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
    MatSelectModule,
    MatListModule,
    MatIconModule,
    CreateEditInterventionModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule 
  ],
  exports: [InterventionsComponent],
  declarations: [InterventionsComponent],
  providers: [],
})
export class IntrventionsModule {}
