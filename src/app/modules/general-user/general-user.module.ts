import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneraUserRoutingModule } from './general-user-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { InfoSectionComponent } from './components/info-section/info-section.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { QuadrantComponent } from './pages/quadrant/quadrant.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { SummaryComponent } from './components/summary/summary.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { QuadrantSectionComponent } from './components/quadrant-section/quadrant-section.component';
import { IndicatorComponent } from './pages/indicator/indicator.component';
import { QuadrantSummaryComponent } from './pages/quadrant-summary/quadrant-summary.component';
import { IndicatorSummaryComponent } from './pages/indicator-summary/indicator-summary.component';




@NgModule({
  declarations: [
    HomeComponent,
    InfoSectionComponent,
    SponsorsComponent,
    QuadrantComponent,
    LayoutComponent,
    SummaryComponent,
    CarrouselComponent,
    QuadrantSectionComponent,
    IndicatorComponent,
    QuadrantSummaryComponent,
    IndicatorSummaryComponent,

  ],
  imports: [
    CommonModule,
    GeneraUserRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class GeneralUserModule { }
