import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotizacionPostergarPageRoutingModule } from './cotizacion-postergar-routing.module';

import { CotizacionPostergarPage } from './cotizacion-postergar.page';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CotizacionPostergarPageRoutingModule,
    SharedModule
  ],
  declarations: [CotizacionPostergarPage]
})
export class CotizacionPostergarPageModule {}
