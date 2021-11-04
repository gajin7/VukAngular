import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PermissionGuard } from "src/app/shared/guards/permission.guard";
import { ROLE } from "src/app/shared/model/role";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("../home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "appointments",
    loadChildren: () =>
      import("../appointments/appointments.module").then(
        (m) => m.AppointmentsModule
      ),
    data: {
      permissions: [ROLE.ADMIN, ROLE.PATIENT],
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "schedule",
    loadChildren: () =>
      import("../appointments/appointments.module").then(
        (m) => m.AppointmentsModule
      ),
    data: {
      permissions: [ROLE.DENTIST],
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "interventions",
    loadChildren: () =>
      import("../interventions/interventions.module").then(
        (m) => m.IntrventionsModule
      ),
    data: {
      permissions: [ROLE.ADMIN, ROLE.DENTIST],
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "administration",
    loadChildren: () =>
      import("../administration/administration.module").then(
        (m) => m.AdministrationModule
      ),
    data: {
      permissions: [ROLE.ADMIN],
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "bills",
    loadChildren: () =>
      import("../bills/bills.module").then((m) => m.BillsModule),
  },
  {
    path: "",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
