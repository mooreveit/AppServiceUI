import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasEditPageRoutingModule } from './recetas-edit-routing.module';

import { RecetasEditPage } from './recetas-edit.page';
import {SharedModule} from '../../../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasEditPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [RecetasEditPage]
})
export class RecetasEditPageModule { }
