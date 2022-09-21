import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactosCreatePage } from './contactos-create.page';

const routes: Routes = [
  {
    path: '',
    component: ContactosCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactosCreatePageRoutingModule {}
