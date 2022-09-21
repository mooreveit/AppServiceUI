import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchEstadoCuentaPageRoutingModule } from './search-estado-cuenta-routing.module';

import { SearchEstadoCuentaPage } from './search-estado-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchEstadoCuentaPageRoutingModule
  ],
  declarations: [SearchEstadoCuentaPage]
})
export class SearchEstadoCuentaPageModule {}
