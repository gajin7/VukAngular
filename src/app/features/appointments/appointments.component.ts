import { Component, OnInit } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Subject } from "rxjs";
import { finalize, take, takeUntil } from "rxjs/operators";
import { AppointmentPersonalResponse } from "src/app/models/response/appointmentPersonalResponse";
import { AppointmentResponse } from "src/app/models/response/appointmentResponse";
import { AppointmentService } from "src/app/services/appointment.service";
import { GlobalService } from "src/app/shared/services/global-service";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.scss"],
})
export class AppointmentsComponent implements OnInit {
  appointments: Array<AppointmentResponse> = [];
  appointmentsPersonal: Array<AppointmentPersonalResponse> = [];

  private yesterday: Date = new Date(
    new Date().valueOf() - 1000 * 60 * 60 * 24
  );
  today: Date = new Date();

  private readonly destroyEvent$ = new Subject();

  constructor(
    private appointmentService: AppointmentService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.getPersonalAppointment();
    this.getAppointments(this.today);
  }

  disablePastDays = (d: Date | null): boolean => {
    return !!d && d.getTime() > this.yesterday.getTime();
  };

  generateDays(): void {}

  dateChangedHandler(date: MatDatepickerInputEvent<Date>): void {
    if (date.value) {
      this.getAppointments(date.value);
    }
  }

  getAppointments(date: Date) {
    this.globalService.activateLoader();
    this.appointmentService
      .getAppointments(date.toISOString())
      .pipe(
        take(1),
        takeUntil(this.destroyEvent$),
        finalize(() => {
          this.globalService.deactivateLoader();
        })
      )
      .subscribe((data) => {
        this.appointments = data as Array<AppointmentResponse>;
      });
  }

  BookAppoitment(appointment: AppointmentResponse) {
    this.appointmentService
      .bookAppointment(appointment.Id)
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe(() => {
        window.alert("nesto");
      });
  }

  getPersonalAppointment() {
    this.appointmentService
      .getPersonalAppointments()
      .pipe(take(1), takeUntil(this.destroyEvent$))
      .subscribe((data) => {
        this.appointmentsPersonal = data as Array<AppointmentPersonalResponse>;
        console.log(data);
      });
  }
}
