import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchExistenciaPage } from './search-existencia.page';

const routes: Routes = [
  {
    path: '',
    component: SearchExistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchExistenciaPageRoutingModule {}
