import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetencionesListPage } from './retenciones-list.page';

const routes: Routes = [
  {
    path: '',
    component: RetencionesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetencionesListPageRoutingModule {}
