import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class BaseAlertService {
  constructor(private snackBar: MatSnackBar) {}

  showAlert(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }
}
