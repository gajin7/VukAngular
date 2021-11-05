import { Component, OnInit } from "@angular/core";
import { ROLE } from "../../model/role";
import { AuthStoreService } from "../../services/auth-store-service";
import { SideMenuItemI } from "./side-menu-item.interface";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent implements OnInit {
  navigationItems: SideMenuItemI[] = [
    { displayName: "Početna", key: "home", route: "/home", icon: "home" },
    {
      displayName: "Zakazivanje",
      key: "appointments",
      route: "/appointments",
      icon: "edit_calendar",
      canActivateRole: [ROLE.ADMIN, ROLE.PATIENT],
    },
    {
      displayName: "Raspored",
      key: "schedule",
      route: "/schedule",
      icon: "edit_calendar",
      canActivateRole: [ROLE.DENTIST],
    },
    {
      displayName: "Intervencije",
      key: "interventions",
      route: "/interventions",
      icon: "dvr",
      canActivateRole: [ROLE.ADMIN, ROLE.DENTIST],
    },
    {
      displayName: "Karton",
      key: "patient-card",
      route: "/patient-card",
      icon: "dvr",
      canActivateRole: [ROLE.PATIENT],
    },
    {
      displayName: "Računi",
      key: "bills",
      route: "/bills",
      icon: "receipt_long",
    },
    {
      displayName: "Upravljački panel",
      key: "administration",
      route: "/administration",
      icon: "admin_panel_settings",
      canActivateRole: [ROLE.ADMIN],
    },
  ];

  constructor(private authStoreService: AuthStoreService) {}

  ngOnInit(): void {
    this.navigationItems = this.navigationItems.filter((i) => {
      if (i.canActivateRole?.length) {
        return i.canActivateRole.includes(this.authStoreService.role || "");
      }
      return true;
    });
  }
}
