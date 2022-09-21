import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasListPageRoutingModule } from './recetas-list-routing.module';

import { RecetasListPage } from './recetas-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasListPageRoutingModule
  ],
  declarations: [RecetasListPage]
})
export class RecetasListPageModule {}
