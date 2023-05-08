import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorUserRoutingModule } from './indicator-user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfoComponent } from './components/info/info.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SubIndicatorGeneralComponent } from './pages/sub-indicator-general/sub-indicator-general.component';
import { SubIndicatorSpecificComponent } from './pages/sub-indicator-specific/sub-indicator-specific.component';
import { EvidenceComponent } from './components/evidence/evidence.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    InfoComponent,
    SideBarComponent,
    LayoutComponent,
    SubIndicatorGeneralComponent,
    SubIndicatorSpecificComponent,
    EvidenceComponent
  ],
  imports: [
    CommonModule,
    IndicatorUserRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class IndicatorUserModule { }
