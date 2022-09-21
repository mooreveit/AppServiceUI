import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { SharedModule } from '../../../shared/shared.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CurrencyMaskModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule { }
