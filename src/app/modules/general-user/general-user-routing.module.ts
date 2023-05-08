import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { QuadrantComponent } from './pages/quadrant/quadrant.component';

const routes:Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path:'quadrant/:id',
        component:QuadrantComponent
      }
    ]
  },
  {
    path:'quadrant/:id/indicator/:id',
    loadChildren:()=>import('../indicator-user/indicator-user.module').then(m=>m.IndicatorUserModule)
  },
  {
    path:'subindicator-view',
    loadChildren:()=>import('../subindicator-specific-view/subindicator-specific-view.module').then(m=>m.SubindicatorSpecificViewModule)
  }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class GeneraUserRoutingModule{}
