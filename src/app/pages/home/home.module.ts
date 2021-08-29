import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {TopBarComponent} from "../../template/top-bar/top-bar.component";
import {SideBarComponent} from "../../template/side-bar/side-bar.component";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
    ],
  declarations: [HomePage, TopBarComponent, SideBarComponent]
})
export class HomePageModule {}
