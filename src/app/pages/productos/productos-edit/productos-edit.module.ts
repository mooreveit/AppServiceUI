import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosEditPageRoutingModule } from './productos-edit-routing.module';

import { ProductosEditPage } from './productos-edit.page';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosEditPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ProductosEditPage]
})
export class ProductosEditPageModule {}
