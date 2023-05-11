import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserInfoBarComponent } from './components/user-info-bar/user-info-bar.component';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './components/title/title.component';
import { ViewPdfComponent } from './components/view-pdf/view-pdf.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { SemaphoreComponent } from './components/semaphore/semaphore.component';
import { InputEvidence1Component } from './components/input-evidence1/input-evidence1.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SearchSpecificSubindicatorComponent } from './components/search-specific-subindicator/search-specific-subindicator.component';
import { InputEvidence2Component } from './components/input-evidence2/input-evidence2.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { SearchInputComponent } from './components/search-input/search-input.component';



@NgModule({
  declarations: [
    NavBarComponent,
    UserInfoBarComponent,
    FooterComponent,
    TitleComponent,
    ViewPdfComponent,
    AdminSidebarComponent,
    SemaphoreComponent,
    InputEvidence1Component,
    SearchSpecificSubindicatorComponent,
    InputEvidence2Component,
    HeaderComponent,
    AdminHeaderComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    DragDropModule
  ],
  exports:[
    NavBarComponent,
    UserInfoBarComponent,
    FooterComponent,
    TitleComponent,
    ViewPdfComponent,
    AdminSidebarComponent,
    SemaphoreComponent,
    InputEvidence1Component,
    SearchSpecificSubindicatorComponent,
    InputEvidence2Component,
    HeaderComponent,
    AdminHeaderComponent,
    SearchInputComponent
  ]
})
export class SharedModule { }
