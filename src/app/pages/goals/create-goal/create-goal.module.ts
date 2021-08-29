import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateGoalPageRoutingModule } from './create-goal-routing.module';

import { CreateGoalPage } from './create-goal.page';
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateGoalPageRoutingModule,
        CurrencyMaskModule
    ],
  declarations: [CreateGoalPage]
})
export class CreateGoalPageModule {}
