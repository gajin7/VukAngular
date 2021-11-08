import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Observer } from "rxjs";
import { SubmittableFormPopupComponent } from "./submittable-form-popup.component";

@Injectable()
export class SubmittableFormPopupService {
  constructor(private matDialog: MatDialog) {}

  openDialogForm(formGroup: FormGroup, title: string): Observable<{ [key: string]: any }> {
    return new Observable((subscriber: Observer<{ [key: string]: any }>) => {
      this.matDialog
        .open(SubmittableFormPopupComponent, {
          width: "400px",
          data: {
            formGroup,
            title
          },
        })
        .afterClosed()
        .subscribe((v) => {
          subscriber.next(v);
          subscriber.complete();
        });
    });
  }
}
