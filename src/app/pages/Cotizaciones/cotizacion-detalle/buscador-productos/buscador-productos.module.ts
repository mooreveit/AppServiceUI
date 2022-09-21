import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscadorProductosPageRoutingModule } from './buscador-productos-routing.module';

import { BuscadorProductosPage } from './buscador-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscadorProductosPageRoutingModule
  ],
  declarations: [BuscadorProductosPage]
})
export class BuscadorProductosPageModule {}
