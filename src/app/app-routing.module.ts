import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/main/main.module").then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./features/auth/auth.module").then(
        (m) => m.AuthModule
      ),
  },
  {
    path: "page-not-found",
    loadChildren: () =>
      import("./layouts/page-not-found/page-not-found.module").then(
        (m) => m.PageNotFoundModule
      ),
  },
  {
    path: "**",
    redirectTo: "page-not-found",
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
