import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { InterventionModel } from "../../model/intervention.model";
import { ServiceModel } from "../../model/service.model";
import { ToothModel } from "../../model/tooth.model";

export enum INTERVENTION_ACTIONS {
  SAVE,
  FINISH,
  SHOW_BILL,
}

@Component({
  selector: "app-create-edit-intervention",
  templateUrl: "./create-edit-intervention.component.html",
  styleUrls: ["./create-edit-intervention.component.scss"],
})
export class CreateEditInterventionComponent implements OnChanges {
  @Input()
  isEditMode: boolean = false;
  @Input()
  intervention: InterventionModel | undefined = undefined;

  @Input()
  services: ServiceModel[] = [];
  @Input()
  teeth: ToothModel[] = [];

  @Output()
  saveClick: EventEmitter<Partial<InterventionModel>> = new EventEmitter();
  @Output()
  finishClick: EventEmitter<void> = new EventEmitter();
  @Output()
  showBillClick: EventEmitter<void> = new EventEmitter();

  @ViewChild("servicesList") servicesList?: ElementRef;
  @ViewChild("teethList") teethList?: ElementRef;

  selectedService: ServiceModel[] = [];
  selectedTooth: ToothModel[] = [];

  readonly ACTIONS = INTERVENTION_ACTIONS;

  constructor() {}

  ngOnChanges(): void {
    this.selectedService = this.services.filter(
      (s) => s.Id === this.intervention?.ServiceId
    );
    if (this.selectedService.length && this.servicesList) {
      this.servicesList.nativeElement.scrollTo(
        0,
        48 * this.services.indexOf(this.selectedService[0])
      );
    }

    this.selectedTooth = this.teeth.filter(
      (t) => t.Id === this.intervention?.ToothId
    );
    if (this.selectedTooth.length && this.teethList) {
      this.teethList.nativeElement.scrollTo(
        0,
        48 * this.teeth.indexOf(this.selectedTooth[0])
      );
    }
  }

  emmitAction(action: INTERVENTION_ACTIONS): void {
    switch (action) {
      case INTERVENTION_ACTIONS.SAVE:
        this.saveClick.emit({
          ServiceId: this.selectedService[0].Id,
          ToothId: this.selectedTooth[0].Id,
        });
        break;
      case INTERVENTION_ACTIONS.SHOW_BILL:
        this.showBillClick.emit();
        break;
      case INTERVENTION_ACTIONS.FINISH:
        this.finishClick.emit();
        break;
    }
  }
}
