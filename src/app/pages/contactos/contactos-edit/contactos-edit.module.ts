import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactosEditPageRoutingModule } from './contactos-edit-routing.module';

import { ContactosEditPage } from './contactos-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ContactosEditPageRoutingModule
  ],
  declarations: [ContactosEditPage]
})
export class ContactosEditPageModule { }
