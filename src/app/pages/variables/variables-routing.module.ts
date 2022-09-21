import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VariablesPage } from './variables.page';

const routes: Routes = [
  {
    path: '',
    component: VariablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VariablesPageRoutingModule {}
