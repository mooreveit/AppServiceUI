import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosWebPage } from './fotos-web.page';

const routes: Routes = [
  {
    path: '',
    component: FotosWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosWebPageRoutingModule {}
