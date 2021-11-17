import { Component, OnDestroy, OnInit, Type } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSelectionListChange } from "@angular/material/list";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { debounceTime, finalize, take, takeUntil } from "rxjs/operators";
import { Configuration } from "src/app/config/configuration";
import { SubmittableFormPopupService } from "src/app/shared/components/submittable-form-popup/submittable-form-popup.service";
import { BillModel } from "src/app/shared/model/bill.model";
import { CardModel } from "src/app/shared/model/card.model";
import { InterventionModel } from "src/app/shared/model/intervention.model";
import { ServiceTypeModel } from "src/app/shared/model/service-type.mode";
import { ServiceModel } from "src/app/shared/model/service.model";
import { UserModel } from "src/app/shared/model/user.model";
import { BaseAlertService } from "src/app/shared/services/base-alert-service";
import { BaseWebService } from "src/app/shared/web-services/base-web-service.service";
import { AdministrationItemI } from "./administration-item.interface";

@Component({
  selector: "app-administration",
  templateUrl: "./administration.component.html",
  styleUrls: ["./administration.component.scss"],
  providers: [FormBuilder, SubmittableFormPopupService],
})
export class AdministrationComponent implements OnInit, OnDestroy {
  readonly administrationItems: AdministrationItemI[] = [
    {
      type: BillModel,
      displayName: "Račun",
      internalName: "bill",
      url: Configuration.PATH_BILLS,
      permanent: true
    },
    {
      type: CardModel,
      displayName: "Karton",
      internalName: "card",
      url: Configuration.PATH_CARDS,
      paginated: true,
      goForDetails: "intervention",
      permanent: true
    },
    {
      type: ServiceModel,
      displayName: "Usluga",
      internalName: "service",
      url: Configuration.PATH_SERVICES,
      editable: true,
      createModel: {
        button: "Kreiraj uslugu",
        Id: -1,
        Name: "",
        Price: "",
        Description: "",
        ServiceTypeId: {
          type: ServiceTypeModel,
          url: Configuration.PATH_SERVICE_TYPES,
        },
      },
    },
    {
      type: UserModel,
      displayName: "Korisnik",
      internalName: "user",
      url: Configuration.PATH_USERS,
      createUrl: Configuration.PATH_USERS_CREATE,
      isDependant: true,
      paginated: true,
      queryParameters: {
        key: "userTypeId",
        value: "Uloga",
        values: { 1: "Admin", 2: "Dentist", 3: "Patient" },
      },
      createModel: {
        button: "Kreiraj zubara",
        FirstName: "",
        LastName: "",
        TypeId: 2,
        Email: "",
        Password: "",
      },
    },
    {
      type: InterventionModel,
      displayName: "Intervencija",
      internalName: "intervention",
      url: Configuration.PATH_INTERVENTION,
      isDependant: true,
      parameters: {
        key: "cardId",
        value: "ID kartona pacijenta",
      },
    },
  ];

  public readonly COLUMN_DN: { [key: string]: string } = {
    AppointmentDate: "Datum termina",
    TotalPrice: "Ukupna cena",
    PatientName: "Ime pacijenta",
    DentistName: "Ime zubara",
    Services: "Usluge",
    Interventions: "Intervencije",
    Name: "Naziv",
    Price: "Cena",
    Description: "Opis",
    Email: "Email",
    FirstName: "Ime",
    LastName: "Prezime",
    Type: "Uloga",
    LastAppointment: "Poslednji termin",
    SuggestedAppointment: "Sugestija",
    ServiceName: "Naziv usluge",
    IsExecuted: "Dovršena",
    ToothName: "Zub",
    Akcije: "Akcije",
    ServiceTypeId: "Vrsta usluge",
    ServiceTypeName: "Tip",
  };

  public readonly IGNORE = ["ServiceTypeId"];

  selectedItem: AdministrationItemI | undefined = undefined;
  selectedItemModel: AdministrationItemI[] = [];
  selectedClassColumns: string[] = [];
  selectedClassEntities: any[] = [];
  readonly dependantValue$: Subject<string> = new Subject();
  dependantValueSubscription: Subscription | undefined = undefined;
  dependantValue: string = "";

  createItemFormGroup?: FormGroup;

  private readonly destroyEvent$ = new Subject();

  constructor(
    private baseWebService: BaseWebService,
    private fb: FormBuilder,
    private formPopup: SubmittableFormPopupService,
    private baseAlert: BaseAlertService
  ) {}

  ngOnInit(): void {}

  trackByInternalName(_index: number, item: AdministrationItemI): string {
    return item.internalName;
  }

  itemSelected(event: { options: { value: any }[] }): void {
    this.selectedItem = event.options[0].value as AdministrationItemI;
    const selectedType = this.selectedItem.type;
    this.selectedClassColumns = [
      ...Object.getOwnPropertyNames(new selectedType()).filter(
        (c) => this.COLUMN_DN.hasOwnProperty(c) && !this.IGNORE.includes(c)
      ),
      "Akcije",
    ];

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
      this.baseWebService
        .getRequest(url)
        .pipe(take(1), takeUntil(this.destroyEvent$))
        .subscribe(
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
                    x[k] = x[k]
                      .map((s: any) => s.Name || s.ServiceName)
                      .join(", ");
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

  showCreatePopup(editData?: any): void {
    if (this.selectedItem) {
      if (this.selectedItem.createModel) {
        this.createItemFormGroup = this.fb.group({});
        const selections: { [key: string]: { key: any; value: string }[] } = {};
        const waitForRequest = new BehaviorSubject<number | undefined>(
          undefined
        );
        for (let key in this.selectedItem.createModel) {
          if (
            this.selectedItem.createModel[key] &&
            typeof this.selectedItem.createModel[key] === "string" &&
            key[0].toLowerCase() === key[0]
          ) {
            continue;
          }
          if (
            this.selectedItem.createModel[key] &&
            typeof this.selectedItem.createModel[key] === "object" &&
            "type" in this.selectedItem.createModel[key]
          ) {
            waitForRequest.next(
              waitForRequest.value === undefined ? 1 : waitForRequest.value + 1
            );
            this.baseWebService
              .getRequest(this.selectedItem.createModel[key].url)
              .pipe(
                take(1),
                takeUntil(this.destroyEvent$),
                finalize(() => {
                  waitForRequest.next(waitForRequest.value! - 1);
                })
              )
              .subscribe((r: any) => {
                selections[key] = r.map((v: any) => {
                  return {
                    key: v.Id,
                    value: v.Name,
                  };
                });
                this.createItemFormGroup!.addControl(
                  key,
                  this.fb.control(
                    editData ? parseInt(editData[key]) : selections[key][0].key,
                    Validators.required
                  )
                );
              });
          } else {
            this.createItemFormGroup.addControl(
              key,
              this.fb.control(
                editData ? editData[key] : this.selectedItem.createModel[key],
                Validators.required
              )
            );
          }
        }

        waitForRequest.subscribe((v) => {
          if (v === undefined || v === 0) {
            this.formPopup
              .openDialogForm({
                formGroup: this.createItemFormGroup!,
                title: !!editData
                  ? "Izmeni"
                  : this.selectedItem!.createModel!.button,
                selections,
                displayValues: this.COLUMN_DN,
                isEdit: !!editData,
                submitButton: !!editData ? "Sačuvaj" : "Kreiraj",
              })
              .subscribe((formValue: { [key: string]: any }) => {
                if (formValue) {
                  const isEdit = formValue.isEdit;
                  delete formValue.isEdit;
                  if (isEdit) {
                    this.baseWebService
                      .putRequest(
                        `${this.selectedItem?.url}/${formValue.Id}`,
                        formValue
                      )
                      .pipe(take(1), takeUntil(this.destroyEvent$))
                      .subscribe((resp: any) => {
                        this.loadEntities();
                        this.baseAlert.showAlert(
                          resp.FirstName ||
                            resp.Name +
                              " je ažuiran! Ukoliko postoji zavisno polje unesite vrednost da biste videli kreiran objekat."
                        );
                      });
                  } else {
                    this.baseWebService
                      .postRequest(
                        this.selectedItem?.createUrl ||
                          this.selectedItem?.url ||
                          "",
                        formValue
                      )
                      .pipe(take(1), takeUntil(this.destroyEvent$))
                      .subscribe((resp: any) => {
                        this.loadEntities();
                        this.baseAlert.showAlert(
                          resp.FirstName ||
                            resp.Name +
                              " je kreiran! Ukoliko postoji zavisno polje unesite vrednost da biste videli kreiran objekat."
                        );
                      });
                  }
                }
              });
          }
        });
      } else {
        this.createItemFormGroup = undefined;
      }
    }
  }

  dependantIdEntered(v: any): void {
    this.dependantValue$.next(v.value);
  }

  deleteItem(v: any): void {
    if (this.selectedItem?.url) {
      this.baseWebService
        .deleteRequest(this.selectedItem.url + "/" + v.Id)
        .pipe(take(1), takeUntil(this.destroyEvent$))
        .subscribe(() => {
          this.loadEntities();
          this.baseAlert.showAlert(
            v.FirstName ||
              v.Name +
                " je uspešno obrisan!"
          );
        });
    }
  }

  editItem(v: any): void {
    this.showCreatePopup(v);
  }

  goForDetails(v: any): void {
    if (this.selectedItem?.goForDetails) {
      const item = this.administrationItems.find(
        (i) => i.internalName === this.selectedItem!.goForDetails
      );
      if (item) {
        this.selectedItemModel = [item];
        this.itemSelected({ options: [{ value: item }] });
        this.dependantValue = v.Id;
        this.dependantIdEntered({ value: v.Id });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyEvent$.next();
  }
}
