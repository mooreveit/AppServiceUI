import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactosListPageRoutingModule } from './contactos-list-routing.module';

import { ContactosListPage } from './contactos-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactosListPageRoutingModule
  ],
  declarations: [ContactosListPage]
})
export class ContactosListPageModule {}
