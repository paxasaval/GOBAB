import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { SubIndicatorGeneralComponent } from './pages/sub-indicator-general/sub-indicator-general.component';
import { SubIndicatorSpecificComponent } from './pages/sub-indicator-specific/sub-indicator-specific.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'Instancia-responsable',
        component:SubIndicatorGeneralComponent,
        data:{typeID:'64400a11cf6b0eec947e8867'}
      },
      {
        path:'',
        redirectTo:'Instancia-responsable',
        pathMatch:'full'
      },
      {
        path:'Diagnostico',
        component:SubIndicatorGeneralComponent,
        data:{typeID:'64400a11cf6b0eec947e8869'}

      },
      {
        path:'Normativa-y Reglamentación',
        component:SubIndicatorGeneralComponent,
        data:{typeID:'64400a11cf6b0eec947e886b'}

      },
      {
        path:'Mecanismos',
        component:SubIndicatorGeneralComponent,
        data:{typeID:'64400a11cf6b0eec947e8871'}

      },
      {
        path:'specific-sub-indicators',
        component:SubIndicatorSpecificComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorUserRoutingModule { }
