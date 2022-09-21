import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrabacionCobranzaListPage } from './grabacion-cobranza-list.page';

const routes: Routes = [
  {
    path: '',
    component: GrabacionCobranzaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrabacionCobranzaListPageRoutingModule {}
