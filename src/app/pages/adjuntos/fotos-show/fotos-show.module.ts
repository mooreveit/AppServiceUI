import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosShowPageRoutingModule } from './fotos-show-routing.module';

import { FotosShowPage } from './fotos-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosShowPageRoutingModule
  ],
  declarations: [FotosShowPage]
})
export class FotosShowPageModule {}
