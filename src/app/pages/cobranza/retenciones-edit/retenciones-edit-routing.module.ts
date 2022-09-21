import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetencionesEditPage } from './retenciones-edit.page';

const routes: Routes = [
  {
    path: '',
    component: RetencionesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetencionesEditPageRoutingModule {}
