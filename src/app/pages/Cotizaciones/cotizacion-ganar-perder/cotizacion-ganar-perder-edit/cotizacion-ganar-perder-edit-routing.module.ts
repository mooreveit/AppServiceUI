import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizacionGanarPerderEditPage } from './cotizacion-ganar-perder-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CotizacionGanarPerderEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizacionGanarPerderEditPageRoutingModule {}
