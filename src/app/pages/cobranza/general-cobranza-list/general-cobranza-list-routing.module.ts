import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralCobranzaListPage } from './general-cobranza-list.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralCobranzaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralCobranzaListPageRoutingModule {}
