import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetencionesListPageRoutingModule } from './retenciones-list-routing.module';

import { RetencionesListPage } from './retenciones-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetencionesListPageRoutingModule
  ],
  declarations: [RetencionesListPage]
})
export class RetencionesListPageModule {}
