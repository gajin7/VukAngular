import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface SubbmitableFormDataI {
  formGroup: FormGroup;
  title: string;
}

@Component({
  selector: "app-submittable-form-popup",
  templateUrl: "./submittable-form-popup.component.html",
  styleUrls: ["./submittable-form-popup.component.scss"],
})
export class SubmittableFormPopupComponent implements OnInit {
  formConfiguration: { [key: string]: { visible: boolean; type: string } } = {};

  @Input() formData?: SubbmitableFormDataI;
  finalData?: SubbmitableFormDataI = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: SubbmitableFormDataI,
    private dialogRef: MatDialogRef<SubmittableFormPopupComponent>
  ) {}

  ngOnInit(): void {
    this.finalData = Object.keys(this.data).length ? this.data : this.formData;
    if (this.finalData?.formGroup?.controls) {
      for (const controlKey in this.finalData.formGroup.controls) {
        this.formConfiguration[controlKey] = {
          visible: !this.finalData.formGroup.controls[controlKey].value,
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
  }

  submitForm(): void {
    if (this.finalData?.formGroup.valid) {
      console.log(this.finalData.formGroup);
      this.dialogRef.close(this.finalData.formGroup.value);
    }
  }
}
