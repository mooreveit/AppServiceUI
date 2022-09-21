import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplateConversionUnitEditPageRoutingModule } from './template-conversion-unit-edit-routing.module';

import { TemplateConversionUnitEditPage } from './template-conversion-unit-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplateConversionUnitEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TemplateConversionUnitEditPage]
})
export class TemplateConversionUnitEditPageModule { }
