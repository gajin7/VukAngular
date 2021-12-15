import { Component, Inject, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppointmentWebService } from "../../web-services/appointment-web.service";

@Component({
  selector: "app-create-appointment-popup",
  templateUrl: "./create-appointment-popup.component.html",
  styleUrls: ["./create-appointment-popup.component.scss"],
})
export class CreateAppointmentPopupComponent implements OnInit {
  generateAuto: boolean = false;

  inputForm: FormGroup | undefined = undefined;

  intervals: { [key: number]: string } = {
    30: "30 min",
    45: "45 min",
    60: "1 sat",
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      generateAuto: boolean;
      currentDay: Date;
      dentistId: string;
    },
    private dialogRef: MatDialogRef<CreateAppointmentPopupComponent>,
    private fb: FormBuilder,
    private appointmentsWebService: AppointmentWebService
  ) {}

  ngOnInit(): void {
    this.generateAuto = this.data.generateAuto;
    this.inputForm = this.fb.group(
      {
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        ...(this.generateAuto
          ? {
              intervals: [Object.keys(this.intervals)[0], Validators.required],
            }
          : {}),
      },
      { validators: this.startEndTimeValidator }
    );
  }

  createAppointments(): void {
    if (this.inputForm) {
      const dateFrom = this.parseTime(
        this.inputForm.value["startTime"],
        this.data.currentDay
      );
      const dateTo = this.parseTime(
        this.inputForm.value["endTime"],
        this.data.currentDay
      );

      if (this.generateAuto) {
        const intervalInMs = this.inputForm.value["intervals"] * 60 * 1000;
        const intervalStartObjects = [];
        let tempStartTime = dateFrom!.getTime();
        while (tempStartTime + intervalInMs <= dateTo!.getTime()) {
          intervalStartObjects.push({
            DateTimeFrom: new Date(tempStartTime).toLocaleString(),
            DateTimeTo: new Date(tempStartTime + intervalInMs).toLocaleString(),
          });
          tempStartTime += intervalInMs;
        }

        this.appointmentsWebService
          .createAppointments(this.data.dentistId, intervalStartObjects)
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      } else {
        this.appointmentsWebService
          .createAppointments(this.data.dentistId, [
            {
              DateTimeFrom: dateFrom?.toLocaleString(),
              DateTimeTo: dateTo?.toLocaleString(),
            },
          ])
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      }
    }
  }

  startEndTimeValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const c1 = control.get("startTime");
    const c2 = control.get("endTime");
    if (c1?.pristine && c2?.pristine) {
      return null;
    }
    const startTime = this.parseTime(c1?.value);
    const endTime = this.parseTime(c2?.value);

    return startTime && endTime && startTime.getTime() >= endTime.getTime()
      ? { timeDiffError: true }
      : null;
  };

  private parseTime(t: string, day?: Date): Date | null {
    if (!t) {
      return null;
    }
    var d = day ? new Date(day.getTime()) : new Date();
    var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time![1]) + (time![3] ? 12 : 0));
    d.setMinutes(parseInt(time![2]) || 0);
    return d;
  }
}
