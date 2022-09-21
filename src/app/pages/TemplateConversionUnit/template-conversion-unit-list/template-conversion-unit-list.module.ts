import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplateConversionUnitListPageRoutingModule } from './template-conversion-unit-list-routing.module';

import { TemplateConversionUnitListPage } from './template-conversion-unit-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplateConversionUnitListPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TemplateConversionUnitListPage]
})
export class TemplateConversionUnitListPageModule { }
