import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizacionDeletePage } from './cotizacion-delete.page';

const routes: Routes = [
  {
    path: '',
    component: CotizacionDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizacionDeletePageRoutingModule {}
