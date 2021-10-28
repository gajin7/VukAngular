import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class GlobalService {
  private readonly _loaderComponent = new BehaviorSubject<boolean>(false);
  readonly isActivatedLoader$ = this._loaderComponent.asObservable();
  constructor() {}

  get isActivatedLoader(): boolean {
    return this._loaderComponent.getValue();
  }

  activateLoader(): void {
    this._loaderComponent.next(true);
  }

  deactivateLoader(): void {
    this._loaderComponent.next(false);
  }
}
