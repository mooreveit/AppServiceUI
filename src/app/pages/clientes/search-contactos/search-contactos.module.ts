import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchContactosPageRoutingModule } from './search-contactos-routing.module';

import { SearchContactosPage } from './search-contactos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchContactosPageRoutingModule
  ],
  declarations: [SearchContactosPage]
})
export class SearchContactosPageModule {}
