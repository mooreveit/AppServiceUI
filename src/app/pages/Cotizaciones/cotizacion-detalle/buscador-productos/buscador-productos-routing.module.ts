import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscadorProductosPage } from './buscador-productos.page';

const routes: Routes = [
  {
    path: '',
    component: BuscadorProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorProductosPageRoutingModule {}
