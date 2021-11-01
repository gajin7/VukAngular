import { Component, OnInit, Type } from "@angular/core";
import { MatSelectionListChange } from "@angular/material/list";
import { Configuration } from "src/app/config/configuration";
import { BillModel } from "src/app/shared/model/bill.model";
import { CardModel } from "src/app/shared/model/card.model";
import { InterventionModel } from "src/app/shared/model/intervention.model";
import { ServiceTypeModel } from "src/app/shared/model/service-type.mode";
import { ServiceModel } from "src/app/shared/model/service.model";
import { UserModel } from "src/app/shared/model/user.model";
import { BaseWebService } from "src/app/shared/web-services/base-web-service.service";
import { AdministrationItemI } from "./administration-item.interface";

@Component({
  selector: "app-administration",
  templateUrl: "./administration.component.html",
  styleUrls: ["./administration.component.scss"],
})
export class AdministrationComponent implements OnInit {
  readonly administrationItems: AdministrationItemI[] = [
    {
      type: BillModel,
      displayName: "Račun",
      internalName: "bill",
      url: Configuration.PATH_BILLS,
      isDependant: true,
    },
    {
      type: CardModel,
      displayName: "Karton",
      internalName: "card",
      url: Configuration.PATH_CARDS,
      paginated: true,
    },
    {
      type: ServiceModel,
      displayName: "Usluga",
      internalName: "service",
      url: Configuration.PATH_SERVICES,
    },
    {
      type: ServiceTypeModel,
      displayName: "Tip usluge",
      internalName: "service-type",
      url: Configuration.PATH_SERVICE_TYPES,
      isDependant: true,
    },
    {
      type: UserModel,
      displayName: "Korisnik",
      internalName: "user",
      url: Configuration.PATH_USERS,
      isDependant: true,
    },
    {
      type: InterventionModel,
      displayName: "Intervencija",
      internalName: "intervention",
      url: Configuration.PATH_INTERVENTION,
      isDependant: true,
    },
  ];

  selectedClassColumns: string[] = [];
  selectedClassEntities: any[] = [];

  constructor(private baseWebService: BaseWebService) {}

  ngOnInit(): void {}

  trackByInternalName(_index: number, item: AdministrationItemI): string {
    return item.internalName;
  }

  itemSelected(event: MatSelectionListChange): void {
    const selectedItem = event.options[0].value as AdministrationItemI;
    const selectedType = selectedItem.type;
    this.selectedClassColumns = Object.getOwnPropertyNames(new selectedType());
    if (selectedItem.url) {
      this.baseWebService
        .getRequest(selectedItem.url, selectedType)
        .subscribe((v: any) => {
          this.selectedClassEntities = selectedItem.paginated ? v.Data : v;
        });
    }
  }
}
