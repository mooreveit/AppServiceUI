import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprobarCobranzaPageRoutingModule } from './aprobar-cobranza-routing.module';

import { AprobarCobranzaPage } from './aprobar-cobranza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprobarCobranzaPageRoutingModule
  ],
  declarations: [AprobarCobranzaPage]
})
export class AprobarCobranzaPageModule {}
