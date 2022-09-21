import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosWebShowPageRoutingModule } from './fotos-web-show-routing.module';

import { FotosWebShowPage } from './fotos-web-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosWebShowPageRoutingModule
  ],
  declarations: [FotosWebShowPage]
})
export class FotosWebShowPageModule {}
