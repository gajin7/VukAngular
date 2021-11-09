import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./registration/registration.module").then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: "reset-password",
    loadChildren: () =>
      import("./reset-password/reset-password.module").then(
        (m) => m.ResetPasswordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
