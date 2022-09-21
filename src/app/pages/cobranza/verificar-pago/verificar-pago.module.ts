import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarPagoPageRoutingModule } from './verificar-pago-routing.module';

import { VerificarPagoPage } from './verificar-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarPagoPageRoutingModule
  ],
  declarations: [VerificarPagoPage]
})
export class VerificarPagoPageModule {}
