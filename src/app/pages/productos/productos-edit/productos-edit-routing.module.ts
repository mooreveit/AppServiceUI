import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosEditPage } from './productos-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosEditPageRoutingModule {}
