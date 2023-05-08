import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderDocumentComponent } from './components/render-document/render-document.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'evidence',
        component:RenderDocumentComponent,
      },
      {
        path:'evidence/:id',
        component:RenderDocumentComponent,
      },
      {
        path:'',
        redirectTo:'evidence',
        pathMatch:'full'
      }
    ]
  },
  {
    path:':id',
    component:LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubindicatorSpecificViewRoutingModule { }
