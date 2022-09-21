import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionListPage } from './configuracion-list.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionListPageRoutingModule {}
