import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprobarCobranzaPage } from './aprobar-cobranza.page';

const routes: Routes = [
  {
    path: '',
    component: AprobarCobranzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprobarCobranzaPageRoutingModule {}
