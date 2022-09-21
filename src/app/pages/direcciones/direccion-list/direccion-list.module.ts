import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionListPageRoutingModule } from './direccion-list-routing.module';

import { DireccionListPage } from './direccion-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionListPageRoutingModule
  ],
  declarations: [DireccionListPage]
})
export class DireccionListPageModule {}
