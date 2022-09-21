import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientesEditPage } from './ingredientes-edit.page';

const routes: Routes = [
  {
    path: '',
    component: IngredientesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientesEditPageRoutingModule {}
