import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubindicatorSpecificViewRoutingModule } from './subindicator-specific-view-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { SideBarEvidencesComponent } from './components/side-bar-evidences/side-bar-evidences.component';
import { RenderDocumentComponent } from './components/render-document/render-document.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SectionEvidenceComponent } from './components/section-evidence/section-evidence.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SideBarEvidencesComponent,
    RenderDocumentComponent,
    SectionEvidenceComponent
  ],
  imports: [
    CommonModule,
    SubindicatorSpecificViewRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SubindicatorSpecificViewModule { }
