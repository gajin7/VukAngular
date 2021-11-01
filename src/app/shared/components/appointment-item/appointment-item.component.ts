import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AppointmentModel } from "src/app/shared/model/appoitment.model";

@Component({
  selector: "app-appointment-item",
  templateUrl: "./appointment-item.component.html",
  styleUrls: ["./appointment-item.component.scss"],
})
export class AppointmentItemComponent implements OnInit {
  @Input()
  appointment: AppointmentModel | null = null;
  @Input()
  isPersonal: boolean = false;
  @Input()
  isPatient: boolean = true;
  @Input()
  dateToCalculate: Date = new Date();
  @Output()
  bookAppointment: EventEmitter<void> = new EventEmitter();
  @Output()
  cancelAppointment: EventEmitter<void> = new EventEmitter();

  duration: string = "";
  readonly today = new Date();
  isPast: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.isPersonal) {
      const date = new Date(this.appointment?.DateTimeFrom || "");
      this.isPast = this.today.getTime() - date.getTime() > 0;
    } else {
      if (this.appointment?.DateTimeFrom && this.appointment?.DateTimeTo) {
        const from = new Date(this.dateToCalculate);
        from.setHours(parseInt(this.appointment?.DateTimeFrom?.split(":")[0]));
        from.setMinutes(
          parseInt(this.appointment?.DateTimeFrom?.split(":")[1])
        );
        this.isPast = this.today.getTime() - from.getTime() > 0;
        const to = new Date(this.dateToCalculate);
        to.setHours(parseInt(this.appointment?.DateTimeTo?.split(":")[0]));
        to.setMinutes(parseInt(this.appointment?.DateTimeTo?.split(":")[1]));

        const time = to.getTime() - from.getTime();
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        this.duration =
          (hours ? hours + "h " : "") + (minutes > 0 ? minutes + "min" : "");
      }
    }
  }

  emitAppointmentSelect(): void {
    this.bookAppointment.next();
  }

  emitAppointmentCancel(): void {
    this.cancelAppointment.next();
  }
}
