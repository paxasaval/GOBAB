import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { LastUpdateComponent } from './component/last-update/last-update.component';
import { QuadrantComponent } from './pages/quadrant/quadrant.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { IndicatorComponent } from './pages/indicator/indicator.component';
import { IndicatorGeneralComponent } from './component/indicator-general/indicator-general.component';
import { NavbarIndicatorsComponent } from './component/navbar-indicators/navbar-indicators.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SpecificSubindicatorsComponent } from './pages/specific-subindicators/specific-subindicators.component';
import { AddSubindicatorComponent } from './pages/add-subindicator/add-subindicator.component';
import { DialogAbstractComponent } from './component/dialog-abstract/dialog-abstract.component';
import { CardInfoComponent } from './component/card-info/card-info.component';
import { HistoryComponent } from './component/history/history.component';
import { InfoComponent } from './component/info/info.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LastUpdateComponent,
    QuadrantComponent,
    HomeComponent,
    IndicatorComponent,
    IndicatorGeneralComponent,
    NavbarIndicatorsComponent,
    SpecificSubindicatorsComponent,
    AddSubindicatorComponent,
    DialogAbstractComponent,
    CardInfoComponent,
    HistoryComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminHomeModule { }
