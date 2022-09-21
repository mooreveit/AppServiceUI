import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceEditPageRoutingModule } from './price-edit-routing.module';

import { PriceEditPage } from './price-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriceEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PriceEditPage]
})
export class PriceEditPageModule {}
