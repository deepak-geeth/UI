import { Routes } from '@angular/router';
import { LoginPage } from './auth/components/login/login.page';
import { SignupPage } from './auth/components/signup/signup.page';
import { AdminPage } from './auth/components/admin-page/admin.page';
import { UserPage } from './auth/components/user-page/user.page';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard, UserGuard } from './auth/roles.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'signup',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginPage ,
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupPage ,
  },
  {
    path:'admin-dashboard',
    component:AdminPage,
    canActivate:[AuthGuard,AdminGuard]
  },
  {
    path:'user-dashboard',
    component:UserPage,
    canActivate:[AuthGuard,UserGuard]
  }

];
