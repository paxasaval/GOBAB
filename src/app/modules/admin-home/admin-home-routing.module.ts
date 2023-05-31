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
import { SearchSpecificSubindicatorComponent } from 'src/app/shared/components/search-specific-subindicator/search-specific-subindicator.component';
import { ReviewSubindicatorSpecifidcComponent } from './pages/review-subindicator-specifidc/review-subindicator-specifidc.component';
import { LayoutIndicatorComponent } from './pages/layout-indicator/layout-indicator.component';
import { UsersComponent } from './pages/users/users.component';
import { UserConfigComponent } from './pages/user-config/user-config.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

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
        path:'workspace',
        component:WorkspaceComponent,
        children:[
          {
            path:'users',
            component:UsersComponent
          },
        ]
      },
      {
        path:'config',
        component:UserConfigComponent
      },
      {
        path:'quadrant/:quadrantNumber/indicator/:number',
        component:LayoutIndicatorComponent,
      },
      {
        path:'quadrant/:quadrantNumber/indicator/:number/:id',
        component:IndicatorComponent,
        children:[
          {
            path:'Instancia-responsable',
            component:IndicatorGeneralComponent,
            data:{typeID:'6461ad67bb91a3acea65635a'},
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
            data:{typeID:'6461ad68bb91a3acea65635c'},
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
            data:{typeID:'6461ad68bb91a3acea65635e'},
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
            data:{typeID:'6461ad68bb91a3acea656360'},
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
            children:[
              {
                path:'',
                component:SearchSpecificSubindicatorComponent
              },
              {
                path:'add-subindicator',
                component:AddSubindicatorComponent
              },
              {
                path:':id',
                component:ReviewSubindicatorSpecifidcComponent,
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

            ]
          },
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
