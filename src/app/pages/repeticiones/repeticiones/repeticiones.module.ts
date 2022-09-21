import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepeticionesPageRoutingModule } from './repeticiones-routing.module';

import { RepeticionesPage } from './repeticiones.page';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepeticionesPageRoutingModule,
    DataTablesModule
  ],
  declarations: [RepeticionesPage]
})
export class RepeticionesPageModule {}
