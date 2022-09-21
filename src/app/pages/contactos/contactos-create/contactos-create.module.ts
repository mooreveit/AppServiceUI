import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactosCreatePageRoutingModule } from './contactos-create-routing.module';

import { ContactosCreatePage } from './contactos-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ContactosCreatePageRoutingModule
  ],
  declarations: [ContactosCreatePage]
})
export class ContactosCreatePageModule { }
