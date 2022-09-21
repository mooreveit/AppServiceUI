import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotizacionGanarPerderPageRoutingModule } from './cotizacion-ganar-perder-routing.module';
import { CotizacionGanarPerderPage } from './cotizacion-ganar-perder.page';

import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CotizacionGanarPerderPageRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],    
    declarations: [
        CotizacionGanarPerderPage
    ] 
})
export class CotizacionGanarPerderPageModule {}
