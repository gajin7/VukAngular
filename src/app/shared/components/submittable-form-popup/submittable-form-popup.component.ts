import { Component, Inject, OnInit, Pipe } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-submittable-form-popup",
  templateUrl: "./submittable-form-popup.component.html",
  styleUrls: ["./submittable-form-popup.component.scss"],
})
export class SubmittableFormPopupComponent implements OnInit {
  formConfiguration: { [key: string]: { visible: boolean; type: string } } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      formGroup: FormGroup;
      title: string;
    },
    private dialogRef: MatDialogRef<SubmittableFormPopupComponent>
  ) {}

  ngOnInit(): void {
    for (const controlKey in this.data.formGroup.controls) {
      this.formConfiguration[controlKey] = {
        visible: !this.data.formGroup.controls[controlKey].value,
        type: ((controlKey) => {
          switch (controlKey) {
            case "Email":
              return "email";
            case "Password":
              return "password";
            default:
              return "text";
          }
        })(controlKey),
      };
    }
  }

  submitForm(): void {
    if (this.data.formGroup.valid) {
      console.log(this.data.formGroup);
      this.dialogRef.close(this.data.formGroup.value);
    }
  }
}
