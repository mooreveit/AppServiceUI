import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrabacionCobranzaEditPage } from './grabacion-cobranza-edit.page';

const routes: Routes = [
  {
    path: '',
    component: GrabacionCobranzaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrabacionCobranzaEditPageRoutingModule {}
