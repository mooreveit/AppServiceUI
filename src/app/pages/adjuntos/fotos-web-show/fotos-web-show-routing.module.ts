import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosWebShowPage } from './fotos-web-show.page';

const routes: Routes = [
  {
    path: '',
    component: FotosWebShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosWebShowPageRoutingModule {}
