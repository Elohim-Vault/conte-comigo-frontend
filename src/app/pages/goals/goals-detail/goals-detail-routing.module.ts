import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalsDetailPage } from './goals-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GoalsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsDetailPageRoutingModule {}
