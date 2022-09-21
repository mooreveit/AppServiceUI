import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientesListPageRoutingModule } from './ingredientes-list-routing.module';

import { IngredientesListPage } from './ingredientes-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientesListPageRoutingModule
  ],
  declarations: [IngredientesListPage]
})
export class IngredientesListPageModule {}
