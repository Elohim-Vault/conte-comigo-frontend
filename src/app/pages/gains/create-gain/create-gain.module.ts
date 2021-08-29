import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateGainPageRoutingModule } from './create-gain-routing.module';

import { CreateGainPage } from './create-gain.page';
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateGainPageRoutingModule,
    CurrencyMaskModule
  ],
  declarations: [CreateGainPage]
})
export class CreateGainPageModule {}
