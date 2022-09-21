import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImprimirCotizacionPage } from './imprimir-cotizacion.page';

const routes: Routes = [
  {
    path: '',
    component: ImprimirCotizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprimirCotizacionPageRoutingModule {}
