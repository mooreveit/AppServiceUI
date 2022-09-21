import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteListPage } from './cliente-list.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteListPageRoutingModule {}
