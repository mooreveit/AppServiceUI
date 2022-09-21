import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasListPage } from './recetas-list.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasListPageRoutingModule {}
