import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscadorUnidadesPage } from './buscador-unidades.page';

const routes: Routes = [
  {
    path: '',
    component: BuscadorUnidadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorUnidadesPageRoutingModule {}
