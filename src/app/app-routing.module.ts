import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './auth/guards/home.guard';
import { ProfileGuard } from './auth/guards/patient.guard';
import { PatientGuard } from './auth/guards/profile.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PatientHomeComponent } from './components/patient/patient-home/patient-home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [HomeGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'patient',
    component: PatientHomeComponent,
    canActivate: [PatientGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
