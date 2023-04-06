import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserInfoBarComponent } from './components/user-info-bar/user-info-bar.component';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './components/title/title.component';



@NgModule({
  declarations: [
    NavBarComponent,
    UserInfoBarComponent,
    FooterComponent,
    TitleComponent
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
    TitleComponent

  ]
})
export class SharedModule { }
