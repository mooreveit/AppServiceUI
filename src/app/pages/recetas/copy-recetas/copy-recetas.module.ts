import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CopyRecetasPageRoutingModule } from './copy-recetas-routing.module';

import { CopyRecetasPage } from './copy-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopyRecetasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CopyRecetasPage]
})
export class CopyRecetasPageModule { }
