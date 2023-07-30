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
import { ReviewSubindicatorSpecifidcComponent } from './pages/review-subindicator-specifidc/review-subindicator-specifidc.component';
import { LayoutIndicatorComponent } from './pages/layout-indicator/layout-indicator.component';
import { UsersComponent } from './pages/users/users.component';
import { UserConfigComponent } from './pages/user-config/user-config.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { SummaryIndicatorComponent } from './pages/summary-indicator/summary-indicator.component';
import { SpecificSubindicatorsTableComponent } from './component/specific-subindicators/specific-subindicators.component';
import { HelpComponent } from './pages/help/help.component';
import { WkconfigComponent } from './pages/wkconfig/wkconfig.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'quadrant/:id',
        component: QuadrantComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        data: {
          breadcrumb: 'Desarrollo Institucional para un Buen Gobierno'
        }
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          breadcrumb: 'Inicio'
        }
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'workspace',
        component: WorkspaceComponent,
        children: [
          {
            path: 'users',
            component: UsersComponent
          },
          {
            path: 'wkconfig',
            component: WkconfigComponent
          },
          {
            path: '',
            redirectTo: 'users',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'config',
        component: UserConfigComponent
      },
      {
        path: 'quadrant/:quadrantNumber/indicator/:number',
        component: LayoutIndicatorComponent,
      },
      {
        path: 'quadrant/:quadrantNumber/indicator/:number/:id',
        component: IndicatorComponent,
        children: [
          {
            path: 'Resumen',
            component: SummaryIndicatorComponent
          },
          {
            path: '',
            redirectTo: 'Resumen',
            pathMatch: 'full'
          },
          {
            path: 'Instancia-responsable',
            component: IndicatorGeneralComponent,
            data: { typeID: '648fd82bf2888184112b98bf' },
            children: [
              {
                path: '',
                component: SubindicatorGeneralComponent
              },
              {
                path: 'add-evidence',
                component: AddEvidenceComponent
              }
            ]
          },
          {
            path: 'Diagnóstico',
            component: IndicatorGeneralComponent,
            data: { typeID: '648fd82cf2888184112b98c1' },
            children: [
              {
                path: '',
                component: SubindicatorGeneralComponent
              },
              {
                path: 'add-evidence',
                component: AddEvidenceComponent
              }
            ]
          },
          {
            path: 'Normativa-y Reglamentación',
            component: IndicatorGeneralComponent,
            data: { typeID: '648fd82cf2888184112b98c3' },
            children: [
              {
                path: '',
                component: SubindicatorGeneralComponent
              },
              {
                path: 'add-evidence',
                component: AddEvidenceComponent
              }
            ]

          },
          {
            path: 'Mecanismos',
            component: IndicatorGeneralComponent,
            data: { typeID: '648fd82cf2888184112b98c5' },
            children: [
              {
                path: '',
                component: SubindicatorGeneralComponent
              },
              {
                path: 'add-evidence',
                component: AddEvidenceComponent
              }
            ]
          },
          {
            path: 'Subindicadores-Especificos',
            component: SpecificSubindicatorsComponent,
            children: [
              {
                path: '',
                component: SpecificSubindicatorsTableComponent
              },
              {
                path: 'add-subindicator',
                component: AddSubindicatorComponent
              },
              {
                path: ':id',
                component: ReviewSubindicatorSpecifidcComponent,
                children: [
                  {
                    path: '',
                    component: SubindicatorGeneralComponent
                  },
                  {
                    path: 'add-evidence',
                    component: AddEvidenceComponent
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
