import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImprimirCotizacionPageRoutingModule } from './imprimir-cotizacion-routing.module';

import { ImprimirCotizacionPage } from './imprimir-cotizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ImprimirCotizacionPageRoutingModule
  ],
  declarations: [ImprimirCotizacionPage]
})
export class ImprimirCotizacionPageModule { }
