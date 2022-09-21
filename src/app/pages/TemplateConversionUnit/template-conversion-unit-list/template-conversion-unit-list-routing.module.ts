import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateConversionUnitListPage } from './template-conversion-unit-list.page';

const routes: Routes = [
  {
    path: '',
    component: TemplateConversionUnitListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateConversionUnitListPageRoutingModule {}
