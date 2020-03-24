import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

// Components
import { SimplemsdComponents } from './components';

// Routing
import { SimplemsdRoutingModule } from './simplemsd.routing';

// Store
import { SimpleMSDStoreModule } from './store/simplemsd-store.module';

@NgModule({
  declarations: [
    SimplemsdComponents
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    SimplemsdRoutingModule,
    SimpleMSDStoreModule
  ]
})
export class SimplemsdModule { }
