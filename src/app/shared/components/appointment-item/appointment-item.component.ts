import { Component, Input, OnInit } from "@angular/core";
import { Time } from "@angular/common";
import { AppointmentResponse } from "src/app/models/response/appointmentResponse";

@Component({
  selector: "app-appointment-item",
  templateUrl: "./appointment-item.component.html",
  styleUrls: ["./appointment-item.component.scss"],
})
export class AppointmentItemComponent implements OnInit {
  @Input()
  appointment: AppointmentResponse | null = null;

  duration: string = "";

  constructor() {}

  ngOnInit(): void {
    if (this.appointment?.DateTimeFrom && this.appointment?.DateTimeTo) {
      const from = new Date();
      from.setHours(parseInt(this.appointment?.DateTimeFrom?.split(":")[0]));
      from.setMinutes(parseInt(this.appointment?.DateTimeFrom?.split(":")[1]));
      const to = new Date();
      to.setHours(parseInt(this.appointment?.DateTimeTo?.split(":")[0]));
      to.setMinutes(parseInt(this.appointment?.DateTimeTo?.split(":")[1]));

      const time = to.getTime() - from.getTime();
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((time / (1000 * 60)) % 60);
      this.duration = hours + "h " + (minutes > 0 ? minutes + " min" : "");
    }
  }
}
