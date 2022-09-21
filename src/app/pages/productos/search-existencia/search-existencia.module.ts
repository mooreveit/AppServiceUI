import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchExistenciaPageRoutingModule } from './search-existencia-routing.module';

import { SearchExistenciaPage } from './search-existencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchExistenciaPageRoutingModule
  ],
  declarations: [SearchExistenciaPage]
})
export class SearchExistenciaPageModule {}
