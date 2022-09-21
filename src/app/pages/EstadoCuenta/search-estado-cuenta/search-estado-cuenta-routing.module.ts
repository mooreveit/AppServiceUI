import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchEstadoCuentaPage } from './search-estado-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: SearchEstadoCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchEstadoCuentaPageRoutingModule {}
