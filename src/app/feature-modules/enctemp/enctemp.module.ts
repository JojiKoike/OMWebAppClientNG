import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

// Components
import { NTTEncTempComponents } from './components';

// Routing
import { NTTEncTempRoutingModule } from './enctemp.routing';

// Store
import { NTTEncTempStoreModule } from './store/store.module';

@NgModule({
  declarations: [
    NTTEncTempComponents
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    NTTEncTempRoutingModule,
    NTTEncTempStoreModule
  ]
})
export class NTTEncTempModule { }
