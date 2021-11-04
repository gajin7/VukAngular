import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { BillsRoutingModule } from "./bills-routing.module";
import { BillsComponent } from "./bills.component";

@NgModule({
  imports: [
    CommonModule,
    BillsRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatIconModule,MatButtonModule
  ],
  exports: [BillsComponent],
  declarations: [BillsComponent],
  providers: [],
})
export class BillsModule {}
