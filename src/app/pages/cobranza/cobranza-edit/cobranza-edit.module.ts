import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CobranzaEditPageRoutingModule } from './cobranza-edit-routing.module';

import { CobranzaEditPage } from './cobranza-edit.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CobranzaEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CobranzaEditPage]
})
export class CobranzaEditPageModule {}
