import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("../home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "appointment",
    loadChildren: () => import("../appointments/appointments.module").then((m) => m.AppointmentsModule),
  },
  {
    path: "",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
