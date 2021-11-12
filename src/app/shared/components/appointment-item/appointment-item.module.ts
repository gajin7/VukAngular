import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentItemComponent } from './appointment-item.component';


@NgModule({
    imports: [CommonModule, MatButtonModule],
    exports: [AppointmentItemComponent],
    declarations: [AppointmentItemComponent],
    providers: [],
})
export class AppointmentItemModule { }
