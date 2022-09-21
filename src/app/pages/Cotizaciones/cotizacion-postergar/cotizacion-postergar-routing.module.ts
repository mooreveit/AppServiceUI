import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizacionPostergarPage } from './cotizacion-postergar.page';

const routes: Routes = [
  {
    path: '',
    component: CotizacionPostergarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizacionPostergarPageRoutingModule {}
