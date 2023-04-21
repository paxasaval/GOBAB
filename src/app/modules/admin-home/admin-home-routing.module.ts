import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { QuadrantComponent } from './pages/quadrant/quadrant.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'quadrant/:id',
        component:QuadrantComponent
      },
      {
        path:'',
        redirectTo:'quadrant/1',
        pathMatch:'full'
      },
      {
        path:'home',
        component:HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }
