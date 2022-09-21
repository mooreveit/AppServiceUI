import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralCobranzaListPageRoutingModule } from './general-cobranza-list-routing.module';

import { GeneralCobranzaListPage } from './general-cobranza-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralCobranzaListPageRoutingModule
  ],
  declarations: [GeneralCobranzaListPage]
})
export class GeneralCobranzaListPageModule {}
