import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { NTTEncTempService } from '../../services';
import {
  NTTEncTempActionTypes,
  LoadDefaultInput,
  LoadDefaultInputSuccess,
  LoadDefaultInputFail,
  RunSimulation,
  RunSimulationSuccess,
  RunSimulationFail
} from '../actions';

@Injectable()
export class NTTEncTempEffects {
  constructor(
    private actions$: Actions,
    private nttEncTempService: NTTEncTempService
  ) {}


  /**
   * Load Default Inputs
   */
  @Effect()
  loadDefaultInput$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDefaultInput>(NTTEncTempActionTypes.LoadDefaultInput),
    switchMap(_ => {
      return this.nttEncTempService.getDefaultInput().pipe(
        map(result => new LoadDefaultInputSuccess({ output: result })),
        catchError(error => of (new LoadDefaultInputFail({ error })))
      );
    })
  );

  /**
   * Run Simulation
   */
  @Effect()
  runSimulation$: Observable<Action> = this.actions$.pipe(
    ofType<RunSimulation>(NTTEncTempActionTypes.RunSimulation),
    map(action => action.payload),
    switchMap(payload => {
      const { input } = payload;
      return this.nttEncTempService.runSimulation(input).pipe(
        map(result => new RunSimulationSuccess({ output: result })),
        catchError(error => of(new RunSimulationFail({ error })))
      );
    })
  );
}
