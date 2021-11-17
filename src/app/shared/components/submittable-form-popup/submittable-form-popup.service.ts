import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Observer } from "rxjs";
import {
  SubbmitableFormDataI,
  SubmittableFormPopupComponent,
} from "./submittable-form-popup.component";

@Injectable()
export class SubmittableFormPopupService {
  constructor(private matDialog: MatDialog) {}

  openDialogForm(
    data: SubbmitableFormDataI
  ): Observable<{ [key: string]: any }> {
    return new Observable((subscriber: Observer<{ [key: string]: any }>) => {
      this.matDialog
        .open(SubmittableFormPopupComponent, {
          width: "400px",
          data,
        })
        .afterClosed()
        .subscribe((v) => {
          subscriber.next(v);
          subscriber.complete();
        });
    });
  }
}
