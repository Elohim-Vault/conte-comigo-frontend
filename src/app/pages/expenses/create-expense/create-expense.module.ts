import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExpensePageRoutingModule } from './create-expense-routing.module';

import { CreateExpensePage } from './create-expense.page';
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateExpensePageRoutingModule,
        CurrencyMaskModule
    ],
  declarations: [CreateExpensePage]
})
export class CreateExpensePageModule {}
