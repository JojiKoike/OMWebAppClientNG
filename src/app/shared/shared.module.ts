import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from './primeng.module';
import { SharedComponents } from './components';
import { SharedPipes } from './pipes';

@NgModule({
  declarations: [
    ...SharedComponents,
    ...SharedPipes
  ],
  imports: [
    CommonModule,
    PrimengModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    ...SharedComponents,
    ...SharedPipes
  ]
})
export class SharedModule { }
