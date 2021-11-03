import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { InterventionModel } from "../../model/intervention.model";
import { ServiceModel } from "../../model/service.model";
import { ToothModel } from "../../model/tooth.model";

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

  selectedService: ServiceModel[] = [];
  selectedTooth: ToothModel[] = [];

  constructor() {}

  ngOnChanges(): void {
    console.log("change");
    this.selectedService = this.services.filter(
      (s) => s.Id === this.intervention?.ServiceId
    );
    this.selectedTooth = this.teeth.filter(
      (t) => t.Id === this.intervention?.ToothId
    );
  }
}
