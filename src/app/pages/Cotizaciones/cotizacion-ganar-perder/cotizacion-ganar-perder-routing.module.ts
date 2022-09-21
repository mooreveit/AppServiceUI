import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizacionGanarPerderPage } from './cotizacion-ganar-perder.page';

const routes: Routes = [
  {
    path: '',
    component: CotizacionGanarPerderPage
  },  {
    path: 'buscador-competidor',
    loadChildren: () => import('../../Cotizaciones/cotizacion-ganar-perder/buscador-competidor/buscador-competidor.module').then( m => m.BuscadorCompetidorPageModule)
  },
  {
    path: 'cotizacion-ganar-perder-edit',
    loadChildren: () => import('../../Cotizaciones/cotizacion-ganar-perder/cotizacion-ganar-perder-edit/cotizacion-ganar-perder-edit.module').then( m => m.CotizacionGanarPerderEditPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizacionGanarPerderPageRoutingModule {}
