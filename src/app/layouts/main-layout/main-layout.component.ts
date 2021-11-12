import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GlobalService } from "src/app/shared/services/global-service";
@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private readonly destroyEvent$ = new Subject();
  constructor(
    private globalService: GlobalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.globalService.isActivatedLoader$
      .pipe(takeUntil(this.destroyEvent$))
      .subscribe((value) => {
        this.isLoading = value;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
