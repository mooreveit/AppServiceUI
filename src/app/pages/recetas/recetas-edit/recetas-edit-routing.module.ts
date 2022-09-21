import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasEditPage } from './recetas-edit.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasEditPageRoutingModule {}
