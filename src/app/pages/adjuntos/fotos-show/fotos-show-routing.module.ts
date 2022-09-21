import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosShowPage } from './fotos-show.page';

const routes: Routes = [
  {
    path: '',
    component: FotosShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosShowPageRoutingModule {}
