import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrabacionCobranzaEditPageRoutingModule } from './grabacion-cobranza-edit-routing.module';

import { GrabacionCobranzaEditPage } from './grabacion-cobranza-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GrabacionCobranzaEditPageRoutingModule
  ],
  declarations: [GrabacionCobranzaEditPage]
})
export class GrabacionCobranzaEditPageModule {}
