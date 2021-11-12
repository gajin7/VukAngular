import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterventionsComponent } from './interventions.component';

const routes: Routes = [{ path: '', component: InterventionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventionsRoutingModule {}
