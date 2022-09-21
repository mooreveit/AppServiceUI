import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotizacionDeletePageRoutingModule } from './cotizacion-delete-routing.module';
import { CotizacionDeletePage } from './cotizacion-delete.page';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CotizacionDeletePageRoutingModule,
    SharedModule
  ],
    declarations: [CotizacionDeletePage]        
})
export class CotizacionDeletePageModule {}
