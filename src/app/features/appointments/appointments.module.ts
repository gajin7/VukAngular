import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AppointmentItemModule } from "src/app/shared/components/appointment-item/appointment-item.module";
import { CreateAppointmentPopupModule } from "src/app/shared/components/create-appointment-popup/create-appointment-popup.module";
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
    AppointmentItemModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CreateAppointmentPopupModule,
    MatDialogModule,
  ],
  exports: [AppointmentsComponent],
  declarations: [AppointmentsComponent],
  providers: [],
})
export class AppointmentsModule {}
