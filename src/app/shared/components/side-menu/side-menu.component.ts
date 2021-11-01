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
    },
    {
      displayName: "Transakcije",
      key: "transactions",
      route: "/transactions",
      icon: "receipt_long",
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
