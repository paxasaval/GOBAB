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
        path:'responsible-instance',
        component:SubIndicatorGeneralComponent,
        data:{title:'Instancia Responsable',id:'641f09bad9b5d8272b1ada54'}
      },
      {
        path:'',
        redirectTo:'responsible-instance',
        pathMatch:'full'
      },
      {
        path:'diagnostic',
        component:SubIndicatorGeneralComponent,
        data:{title:'Diagnostico',id:'6423abae357f0145adbca034'}
      },
      {
        path:'normativity',
        component:SubIndicatorGeneralComponent,
        data:{title:'Normativa y Reglamentación',id:'6423abae357f0145adbca035'}
      },
      {
        path:'mechanism',
        component:SubIndicatorGeneralComponent,
        data:{title:'Mecanismo',id:'6423abae357f0145adbca036'}
      },
      {
        path:'specific-sub-indicators',
        component:SubIndicatorSpecificComponent,
        data:{title:'Subindicadores Especificos'}
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorUserRoutingModule { }
