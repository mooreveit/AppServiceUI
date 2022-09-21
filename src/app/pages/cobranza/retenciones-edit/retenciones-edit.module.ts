import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetencionesEditPageRoutingModule } from './retenciones-edit-routing.module';

import { RetencionesEditPage } from './retenciones-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RetencionesEditPageRoutingModule
  ],
  declarations: [RetencionesEditPage]
})
export class RetencionesEditPageModule {}
