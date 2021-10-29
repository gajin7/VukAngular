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
      import("../schedule/schedule.module").then((m) => m.ScheduleModule),
    data: {
      permissions: [ROLE.ADMIN, ROLE.DENTIST],
    },
    canActivate: [PermissionGuard],
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
