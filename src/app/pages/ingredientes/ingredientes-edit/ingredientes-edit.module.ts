import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientesEditPageRoutingModule } from './ingredientes-edit-routing.module';

import { IngredientesEditPage } from './ingredientes-edit.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientesEditPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [IngredientesEditPage]
})
export class IngredientesEditPageModule { }
