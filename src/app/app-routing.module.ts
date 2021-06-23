import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'create-goal',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./template/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'create-gain',
    loadChildren: () => import('./gains/create-gain/create-gain.module').then(m => m.CreateGainPageModule)
  },
  {
    path: 'create-expense',
    loadChildren: () => import('./expenses/create-expense/create-expense.module').then( m => m.CreateExpensePageModule)
  },
  {
    path: 'create-goal',
    loadChildren: () => import('./goals/create-goal/create-goal.module').then( m => m.CreateGoalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
