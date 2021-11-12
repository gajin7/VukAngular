import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const c1 = control.get("Password");
    const c2 = control.get("RepeatPassword");
    if (c1?.pristine && c2?.pristine) {
      return null;
    }
    return c1?.value !== c2?.value ? { paswordMatch: true } : null;
  };
}
