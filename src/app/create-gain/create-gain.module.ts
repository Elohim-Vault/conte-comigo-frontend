import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateGainPageRoutingModule } from './create-gain-routing.module';

import { CreateGainPage } from './create-gain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateGainPageRoutingModule
  ],
  declarations: [CreateGainPage]
})
export class CreateGainPageModule {}
