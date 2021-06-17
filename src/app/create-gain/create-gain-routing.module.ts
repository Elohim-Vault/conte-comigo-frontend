import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateGainPage } from './create-gain.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateGainPageRoutingModule {}
