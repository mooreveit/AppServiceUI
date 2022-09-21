import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { EditPageRoutingModule } from './edit-routing.module';
import { EditPage } from './edit.page';

import { SharedModule } from '../../../../shared/shared.module';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CurrencyMaskModule
  ],
  exports: [
  EditPage,   

    //NumberInputComponent
],
  declarations: [EditPage]
})
export class EditPageModule { }
