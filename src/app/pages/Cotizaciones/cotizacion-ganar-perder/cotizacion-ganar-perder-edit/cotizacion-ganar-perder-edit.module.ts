import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CotizacionGanarPerderEditPageRoutingModule } from './cotizacion-ganar-perder-edit-routing.module';
import { CotizacionGanarPerderEditPage } from './cotizacion-ganar-perder-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CotizacionGanarPerderEditPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [CotizacionGanarPerderEditPage]
})
export class CotizacionGanarPerderEditPageModule {}