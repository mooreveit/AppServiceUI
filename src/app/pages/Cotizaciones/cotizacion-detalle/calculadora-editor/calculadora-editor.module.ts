import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculadoraEditorPageRoutingModule } from './calculadora-editor-routing.module';

import { CalculadoraEditorPage } from './calculadora-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculadoraEditorPageRoutingModule
  ],
  declarations: [CalculadoraEditorPage]
})
export class CalculadoraEditorPageModule {}
