import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LayaoutComponent } from './pages/layaout/layaout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    LayaoutComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
  ]
})
export class LoginModule { }
