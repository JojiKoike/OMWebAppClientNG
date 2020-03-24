import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from './reducers';
import { SimpleMSDEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('SimpleMSD', reducer),
    EffectsModule.forFeature([SimpleMSDEffects])
  ]
})
export class SimpleMSDStoreModule { }
