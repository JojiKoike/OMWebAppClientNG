import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from './reducers';
import { NTTEncTempEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('NTTEncTemp', reducer),
    EffectsModule.forFeature([NTTEncTempEffects])
  ]
})
export class NTTEncTempStoreModule { }
