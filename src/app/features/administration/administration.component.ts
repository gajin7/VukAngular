import { Component, OnInit } from "@angular/core";
import { AdministrationItemI } from "./administration-item.interface";

@Component({
  selector: "app-administration",
  templateUrl: "./administration.component.html",
  styleUrls: ["./administration.component.scss"],
})
export class AdministrationComponent implements OnInit {
  entitiesList: AdministrationItemI[] = [];

  constructor() {}

  ngOnInit(): void {
    this.entitiesList = [];
  }
}
