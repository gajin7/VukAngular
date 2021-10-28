import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AppointmentItemModule } from "src/app/shared/components/appointment-item/appointment-item.module";
import { AppointmentsComponent } from "./appointments.component";
import { AppointmentRoutingModule } from "./appoitments-routing.module";

@NgModule({
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    AppointmentItemModule
  ],
  exports: [AppointmentsComponent],
  declarations: [AppointmentsComponent],
  providers: [],
})
export class AppointmentsModule {}
