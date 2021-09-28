import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'create-gain',
    loadChildren: () => import('./pages/gains/create-gain/create-gain.module').then(m => m.CreateGainPageModule)
  },
  {
    path: 'create-expense',
    loadChildren: () => import('./pages/expenses/create-expense/create-expense.module').then(m => m.CreateExpensePageModule)
  },
  {
    path: 'create-goal',
    loadChildren: () => import('./pages/goals/create-goal/create-goal.module').then(m => m.CreateGoalPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsPageModule)
  },
  {
    path: 'goals',
    loadChildren: () => import('./pages/goals/goals/goals.module').then(m => m.GoalsPageModule)
  },
  {
    path: 'goals-detail',
    loadChildren: () => import('./pages/goals/goals-detail/goals-detail.module').then( m => m.GoalsDetailPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
