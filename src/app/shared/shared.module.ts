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



@NgModule({
  declarations: [
    NavBarComponent,
    UserInfoBarComponent,
    FooterComponent,
    TitleComponent,
    ViewPdfComponent,
    AdminSidebarComponent,
    SemaphoreComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    NavBarComponent,
    UserInfoBarComponent,
    FooterComponent,
    TitleComponent,
    ViewPdfComponent,
    AdminSidebarComponent,
    SemaphoreComponent
  ]
})
export class SharedModule { }
