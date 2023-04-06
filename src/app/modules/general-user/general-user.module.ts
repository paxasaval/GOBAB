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
import { SemaphoreComponent } from './components/semaphore/semaphore.component';
import { MaterialModule } from 'src/app/material/material.module';




@NgModule({
  declarations: [
    HomeComponent,
    InfoSectionComponent,
    SponsorsComponent,
    QuadrantComponent,
    LayoutComponent,
    SummaryComponent,
    SemaphoreComponent,

  ],
  imports: [
    CommonModule,
    GeneraUserRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class GeneralUserModule { }
