import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStepsModule } from 'ng-zorro-antd/steps';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    NzCarouselModule,
    NzBreadCrumbModule,
    NzCheckboxModule,
    NzTableModule,
    NzInputModule,
    NzStepsModule
  ],
  exports:[
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    NzCarouselModule,
    NzBreadCrumbModule,
    NzCheckboxModule,
    NzTableModule,
    NzInputModule,
    NzStepsModule
  ]
})
export class MaterialModule { }
