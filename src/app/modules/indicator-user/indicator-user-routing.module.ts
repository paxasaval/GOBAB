import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { SubIndicatorGeneralComponent } from './pages/sub-indicator-general/sub-indicator-general.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorUserRoutingModule { }
