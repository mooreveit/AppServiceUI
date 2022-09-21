import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactosEditPage } from './contactos-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ContactosEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactosEditPageRoutingModule {}
