import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepeticionesPage } from './repeticiones.page';

const routes: Routes = [
  {
    path: '',
    component: RepeticionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepeticionesPageRoutingModule {}
