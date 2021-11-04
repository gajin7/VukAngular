import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

import { CreateEditInterventionComponent } from "./create-edit-intervention.component";

@NgModule({
  imports: [CommonModule, MatListModule, MatButtonModule, FormsModule,MatIconModule],
  exports: [CreateEditInterventionComponent],
  declarations: [CreateEditInterventionComponent],
  providers: [],
})
export class CreateEditInterventionModule {}
