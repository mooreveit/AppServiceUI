import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculadoraEditorPage } from './calculadora-editor.page';

const routes: Routes = [
  {
    path: '',
    component: CalculadoraEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculadoraEditorPageRoutingModule {}
