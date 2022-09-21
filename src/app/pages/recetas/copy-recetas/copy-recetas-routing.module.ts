import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopyRecetasPage } from './copy-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: CopyRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopyRecetasPageRoutingModule {}
