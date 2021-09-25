import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalsDetailPageRoutingModule } from './goals-detail-routing.module';

import { GoalsDetailPage } from './goals-detail.page';
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GoalsDetailPageRoutingModule,
        CurrencyMaskModule,
        ReactiveFormsModule
    ],
  declarations: [GoalsDetailPage]
})
export class GoalsDetailPageModule {}
