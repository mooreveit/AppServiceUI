import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificarPagoPage } from './verificar-pago.page';

const routes: Routes = [
  {
    path: '',
    component: VerificarPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificarPagoPageRoutingModule {}
