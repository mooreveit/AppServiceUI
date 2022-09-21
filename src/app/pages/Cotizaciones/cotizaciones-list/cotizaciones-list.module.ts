import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotizacionesListPageRoutingModule } from './cotizaciones-list-routing.module';

import { CotizacionesListPage } from './cotizaciones-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CotizacionesListPageRoutingModule
  ],
  declarations: [CotizacionesListPage]
})
export class CotizacionesListPageModule {}
