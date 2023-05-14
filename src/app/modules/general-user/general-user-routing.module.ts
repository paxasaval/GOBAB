import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { QuadrantComponent } from './pages/quadrant/quadrant.component';
import { QuadrantSummaryComponent } from './pages/quadrant-summary/quadrant-summary.component';
import { IndicatorComponent } from './pages/indicator/indicator.component';
import { IndicatorSummaryComponent } from './pages/indicator-summary/indicator-summary.component';

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
        path:'quadrant/:quadrantNumber',
        component:QuadrantComponent,
        children:[
          {
            path:'',
            component:QuadrantSummaryComponent
          },
          {
            path:'indicator/:indicatorNumber',
            component:IndicatorComponent,
            children:[
              {
                path:':id',
                component:IndicatorSummaryComponent
              }
            ]
          }
        ]
      },
      {
        path:'indicator/:id'
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
