import { Component, OnInit } from "@angular/core";
import { SideMenuItemI } from "./side-menu-item.interface";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent implements OnInit {
  navigationItems: SideMenuItemI[] = [
    { displayName: "Početna", key: "home", route: "/home", icon: "home" },
    { displayName: "Zakazivanje", key: "appointment", route: "/appointment", icon: "edit_calendar", canActivateRole: ['*'] },
    { displayName: "Intervencije", key: "interventions", route: "/interventions", icon: "dvr", canActivateRole: ['*'] },
    { displayName: "Transakcije", key: "transactions", route: "/transactions", icon: "receipt_long", canActivateRole: ['*'] }
  ];

  constructor() {}

  ngOnInit(): void {}
}
