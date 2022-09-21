import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosWebPageRoutingModule } from './fotos-web-routing.module';

import { FotosWebPage } from './fotos-web.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosWebPageRoutingModule
  ],
  declarations: [FotosWebPage]
})
export class FotosWebPageModule {}
