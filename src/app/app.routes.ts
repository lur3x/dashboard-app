import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountComponent } from './components/account/account.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'/dashboard',
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'account',
    component: AccountComponent,
  },
  
];
