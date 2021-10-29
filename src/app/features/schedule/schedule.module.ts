import { NgModule } from '@angular/core';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';


@NgModule({
    imports: [ScheduleRoutingModule],
    exports: [ScheduleComponent],
    declarations: [ScheduleComponent],
    providers: [],
})
export class ScheduleModule { }
