import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CobranzaEditPage } from './cobranza-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CobranzaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CobranzaEditPageRoutingModule {}
