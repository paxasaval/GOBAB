import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { QuadrantComponent } from './pages/quadrant/quadrant.component';
import { HomeComponent } from './pages/home/home.component';
import { IndicatorComponent } from './pages/indicator/indicator.component';
import { IndicatorGeneralComponent } from './component/indicator-general/indicator-general.component';
import { SpecificSubindicatorsComponent } from './pages/specific-subindicators/specific-subindicators.component';
import { AddSubindicatorComponent } from './pages/add-subindicator/add-subindicator.component';
import { SubindicatorGeneralComponent } from './component/subindicator-general/subindicator-general.component';
import { AddEvidenceComponent } from './pages/add-evidence/add-evidence.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'quadrant/:id',
        component:QuadrantComponent
      },
      {
        path:'',
        redirectTo:'quadrant/1',
        pathMatch:'full',
        data:{
          breadcrumb:'Desarrollo Institucional para un Buen Gobierno'
        }
      },
      {
        path:'home',
        component:HomeComponent,
        data:{
          breadcrumb:'Inicio'
        }
      },
      {
        path:'quadrant/:id/indicator/:id',
        component:IndicatorComponent,
        children:[
          {
            path:'Instancia-responsable',
            component:IndicatorGeneralComponent,
            data:{typeID:'64400a11cf6b0eec947e8867'},
            children:[
              {
                path:'',
                component:SubindicatorGeneralComponent
              },
              {
                path:'add-evidence',
                component:AddEvidenceComponent
              }
            ]
          },
          {
            path:'',
            redirectTo:'Instancia-responsable',
            pathMatch:'full'
          },
          {
            path:'Diagnostico',
            component:IndicatorGeneralComponent,
            data:{typeID:'64400a11cf6b0eec947e8869'},
            children:[
              {
                path:'',
                component:SubindicatorGeneralComponent
              },
              {
                path:'add-evidence',
                component:AddEvidenceComponent
              }
            ]
          },
          {
            path:'Normativa-y Reglamentación',
            component:IndicatorGeneralComponent,
            data:{typeID:'64400a11cf6b0eec947e886b'},
            children:[
              {
                path:'',
                component:SubindicatorGeneralComponent
              },
              {
                path:'add-evidence',
                component:AddEvidenceComponent
              }
            ]

          },
          {
            path:'Mecanismos',
            component:IndicatorGeneralComponent,
            data:{typeID:'64400a11cf6b0eec947e8871'},
            children:[
              {
                path:'',
                component:SubindicatorGeneralComponent
              },
              {
                path:'add-evidence',
                component:AddEvidenceComponent
              }
            ]
          },
          {
            path:'Subindicadores-Especificos',
            component:SpecificSubindicatorsComponent,

          },
          {
            path:'Subindicadores-Especificos/add-subindicator',
            component:AddSubindicatorComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }
