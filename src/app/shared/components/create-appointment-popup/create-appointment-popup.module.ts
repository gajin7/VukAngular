import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { CreateAppointmentPopupComponent } from "./create-appointment-popup.component";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
    MatIconModule
  ],
  exports: [CreateAppointmentPopupComponent],
  declarations: [CreateAppointmentPopupComponent],
  providers: [],
})
export class CreateAppointmentPopupModule {}
