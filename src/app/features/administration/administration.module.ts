import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SubmittableFormPopupModule } from "src/app/shared/components/submittable-form-popup/submittable-form-popup.module";
import { AdministrationRoutingModule } from "./administration-routing.module";
import { AdministrationComponent } from "./administration.component";

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    SubmittableFormPopupModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule
  ],
  exports: [AdministrationComponent],
  declarations: [AdministrationComponent],
  providers: [],
})
export class AdministrationModule {}
