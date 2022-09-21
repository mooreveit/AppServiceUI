import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscadorCompetidorPageRoutingModule } from './buscador-competidor-routing.module';

import { BuscadorCompetidorPage } from './buscador-competidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscadorCompetidorPageRoutingModule
  ],
  declarations: [BuscadorCompetidorPage]
})
export class BuscadorCompetidorPageModule {}
