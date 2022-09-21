import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceEditPage } from './price-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PriceEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceEditPageRoutingModule {}
