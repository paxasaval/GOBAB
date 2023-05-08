import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes:Routes=[
  {
    path:'user',
    loadChildren: () => import('./modules/general-user/general-user.module').then(m=>m.GeneralUserModule)
  },
  {
    path:'admin',
    canActivate:[AuthGuard],
    loadChildren:()=>import('./modules/admin-home/admin-home.module').then(m=>m.AdminHomeModule)
  },
  {
    path:'login',
    loadChildren:()=>import('./modules/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'',
    redirectTo:'user',
    pathMatch:'full'
  }
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
