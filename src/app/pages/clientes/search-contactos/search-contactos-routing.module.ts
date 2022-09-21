import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchContactosPage } from './search-contactos.page';

const routes: Routes = [
  {
    path: '',
    component: SearchContactosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchContactosPageRoutingModule {}
