import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotizacionEditPageRoutingModule } from './cotizacion-edit-routing.module';

import { CotizacionEditPage } from './cotizacion-edit.page';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CotizacionEditPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CotizacionEditPage]
})
export class CotizacionEditPageModule {}
