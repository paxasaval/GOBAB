import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'user',
    loadChildren: () => import('./modules/general-user/general-user.module').then(m=>m.GeneralUserModule)
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
