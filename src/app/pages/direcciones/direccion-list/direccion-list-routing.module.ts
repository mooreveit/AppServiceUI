import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionListPage } from './direccion-list.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionListPageRoutingModule {}
