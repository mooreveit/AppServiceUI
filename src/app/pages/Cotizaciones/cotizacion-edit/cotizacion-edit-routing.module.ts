import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizacionEditPage } from './cotizacion-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CotizacionEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizacionEditPageRoutingModule {}
