import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientesListPage } from './ingredientes-list.page';

const routes: Routes = [
  {
    path: '',
    component: IngredientesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientesListPageRoutingModule {}
