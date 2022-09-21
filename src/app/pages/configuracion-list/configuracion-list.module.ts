import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionListPageRoutingModule } from './configuracion-list-routing.module';

import { ConfiguracionListPage } from './configuracion-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionListPageRoutingModule
  ],
  declarations: [ConfiguracionListPage]
})
export class ConfiguracionListPageModule {}
