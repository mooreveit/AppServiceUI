import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchClientePageRoutingModule } from './search-cliente-routing.module';

import { SearchClientePage } from './search-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchClientePageRoutingModule
  ],
  declarations: [SearchClientePage]
})
export class SearchClientePageModule {}
