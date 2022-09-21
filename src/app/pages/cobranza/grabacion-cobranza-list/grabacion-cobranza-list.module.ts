import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrabacionCobranzaListPageRoutingModule } from './grabacion-cobranza-list-routing.module';

import { GrabacionCobranzaListPage } from './grabacion-cobranza-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrabacionCobranzaListPageRoutingModule
  ],
  declarations: [GrabacionCobranzaListPage]
})
export class GrabacionCobranzaListPageModule {}
