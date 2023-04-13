import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { LastUpdateComponent } from './component/last-update/last-update.component';
import { QuadrantComponent } from './pages/quadrant/quadrant.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    LastUpdateComponent,
    QuadrantComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    SharedModule
  ]
})
export class AdminHomeModule { }
