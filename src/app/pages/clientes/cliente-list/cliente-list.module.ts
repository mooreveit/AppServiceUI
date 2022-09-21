import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteListPageRoutingModule } from './cliente-list-routing.module';

import { ClienteListPage } from './cliente-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteListPageRoutingModule
  ],
  declarations: [ClienteListPage]
})
export class ClienteListPageModule {}
