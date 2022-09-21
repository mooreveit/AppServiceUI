import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscadorUnidadesPageRoutingModule } from './buscador-unidades-routing.module';

import { BuscadorUnidadesPage } from './buscador-unidades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscadorUnidadesPageRoutingModule
  ],
  declarations: [BuscadorUnidadesPage]
})
export class BuscadorUnidadesPageModule {}
