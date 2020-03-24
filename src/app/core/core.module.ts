import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Application Root Store
import { AppStoreModule } from './store/core-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    AppStoreModule
  ]
})
export class CoreModule { }
