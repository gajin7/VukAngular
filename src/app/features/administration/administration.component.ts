import { Component, OnInit, Type } from "@angular/core";
import { MatSelectionListChange } from "@angular/material/list";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
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
      queryParameters: { key: "appointemntId", value: "ID zakazanog termina" },
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
      paginated: true,
      queryParameters: { key: "userTypeId", value: "ID tipa korisnika" },
    },
    {
      type: InterventionModel,
      displayName: "Intervencija",
      internalName: "intervention",
      url: Configuration.PATH_INTERVENTION,
      isDependant: true,
      parameters: { key: "cardId", value: "ID kartona pacijenta" },
    },
  ];

  selectedItem: AdministrationItemI | undefined = undefined;
  selectedClassColumns: string[] = [];
  selectedClassEntities: any[] = [];
  readonly dependantValue$: Subject<string> = new Subject();
  dependantValueSubscription: Subscription | undefined = undefined;
  dependantValue: string = "";

  constructor(private baseWebService: BaseWebService) {}

  ngOnInit(): void {}

  trackByInternalName(_index: number, item: AdministrationItemI): string {
    return item.internalName;
  }

  itemSelected(event: MatSelectionListChange): void {
    this.selectedItem = event.options[0].value as AdministrationItemI;
    const selectedType = this.selectedItem.type;
    this.selectedClassColumns = Object.getOwnPropertyNames(new selectedType());

    if (this.selectedItem.isDependant) {
      this.selectedClassEntities = [];
      if (this.dependantValueSubscription) {
        this.dependantValueSubscription.unsubscribe();
        this.dependantValue = "";
      }
      this.dependantValueSubscription = this.dependantValue$
        .pipe(debounceTime(200))
        .subscribe((v: string) => {
          if (this.selectedItem?.parameters) {
            this.loadEntities(this.selectedItem.url + "/" + v);
          } else if (this.selectedItem?.queryParameters) {
            this.loadEntities(this.selectedItem.url, {
              [this.selectedItem?.queryParameters.key]: v,
            });
          }
        });
    } else {
      this.loadEntities();
    }
  }

  loadEntities(
    parametrisedUrl?: string,
    parameters?: { [key: string]: string }
  ): void {
    if (this.selectedItem) {
      let url = parametrisedUrl || this.selectedItem.url;
      if (parameters) {
        url = this.baseWebService.constructUrlWithParams(url, parameters);
      }
      this.baseWebService.getRequest(url).subscribe(
        (v: any) => {
          this.selectedClassEntities = this.selectedItem?.paginated
            ? v.Data
            : Array.isArray(v)
            ? v
            : [v];
          this.selectedClassEntities.forEach((x) => {
            Object.keys(x).forEach((k) => {
              if (x[k] && typeof x[k] === "object") {
                if (Array.isArray(x[k])) {
                  x[k] = x[k].map((s: any) => s.Name).join(", ");
                } else if (x[k].hasOwnProperty("Name")) {
                  x[k] = x[k].Name;
                }
              }
            });
          });
        },
        () => {
          this.selectedClassEntities = [];
        }
      );
    }
  }

  dependantIdEntered(v: any): void {
    this.dependantValue$.next(v.target.value);
  }
}
