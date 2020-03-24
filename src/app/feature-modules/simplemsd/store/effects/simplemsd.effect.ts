import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { SimpleMSDService } from '../../services';
import {
  SimpleMSDActionTypes,
  LoadDefaultInput,
  LoadDefaultInputSuccess,
  LoadDefaultInputFail,
  RunSimulation,
  RunSimulationSuccess,
  RunSimulationFail
} from '../actions';

/**
 * Simple MSD Effects
 */
@Injectable()
export class SimpleMSDEffects {
  constructor(
    private actions$: Actions,
    private simpleMSDService: SimpleMSDService
  ) {}

  /**
   * Load Default Inputs
   */
  @Effect()
  loadDefaultInput$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDefaultInput>(SimpleMSDActionTypes.LoadDefaultInput),
    switchMap(_ => {
      return this.simpleMSDService.getDefaultInput().pipe(
        map(result => new LoadDefaultInputSuccess( { output: result })),
        catchError(error => of (new LoadDefaultInputFail({ error })))
      );
    })
  );


  /**
   * Run Simulation
   */
  @Effect()
  runSimulation$: Observable<Action> = this.actions$.pipe(
    ofType<RunSimulation>(SimpleMSDActionTypes.RunSimulation),
    map(action => action.payload),
    switchMap(payload => {
      const { input } = payload;
      return this.simpleMSDService.runSimulation(input).pipe(
        map(result => new RunSimulationSuccess({ output: result })),
        catchError(error => of(new RunSimulationFail({ error })))
      );
    })
  );

}
