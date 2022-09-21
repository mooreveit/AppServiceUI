import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscadorCompetidorPage } from './buscador-competidor.page';

const routes: Routes = [
  {
    path: '',
    component: BuscadorCompetidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorCompetidorPageRoutingModule {}
