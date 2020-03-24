import { Action } from '@ngrx/store';
import { InitUIValuesModel, NTTEncTempInputModel, NTTEncTempOutputModel} from '../../core/models';


/**
 * Action Types
 */
export enum NTTEncTempActionTypes {
  LoadDefaultInput              = '[NTTEncTemp] Load Default Input',
  LoadDefaultInputSuccess       = '[NTTEncTemp] Load Default Input Success',
  LoadDefaultInputFail          = '[NTTEncTemp] Load Default Input Fail',
  RunSimulation                 = '[NTTEncTemp] Run Simulation',
  RunSimulationSuccess          = '[NTTEncTemp] Run Simulation Success',
  RunSimulationFail             = '[NTTEncTemp] Run Simulation Fail',
  ResetSimulationResult         = '[NTTEncTemp] Reset Simulation Result',
}

/**
 * Load Default Input
 */
export class LoadDefaultInput implements Action {
  readonly type = NTTEncTempActionTypes.LoadDefaultInput;
}

/**
 * Load Default Input Success
 */
export class LoadDefaultInputSuccess implements Action {
  readonly type = NTTEncTempActionTypes.LoadDefaultInputSuccess;
  constructor(public payload: { output: InitUIValuesModel }) {}
}

/**
 * Load Default Input Fail
 */
export class LoadDefaultInputFail implements Action {
  readonly type = NTTEncTempActionTypes.LoadDefaultInputFail;
  constructor(public payload?: { error: any } ) {}
}

/**
 * Run Simulation
 */
export class RunSimulation implements Action {
  readonly type = NTTEncTempActionTypes.RunSimulation;
  constructor(public payload: { input: NTTEncTempInputModel}) {
    this.payload = payload;
  }
}

/**
 * Run Simulation Success
 */
export class RunSimulationSuccess implements Action {
  readonly type = NTTEncTempActionTypes.RunSimulationSuccess;
  constructor(public payload: { output: NTTEncTempOutputModel }) {}
}

/**
 * Run Simulation Fail
 */
export class RunSimulationFail implements Action {
  readonly type = NTTEncTempActionTypes.RunSimulationFail;
  constructor(public payload?: { error: any }) {}
}

/**
 * Reset Simulation Result
 */
export class ResetSimulationResult implements Action {
  readonly type = NTTEncTempActionTypes.ResetSimulationResult;
}

/**
 * Actions
 */
export type NTTEncTempActions =
  | LoadDefaultInput
  | LoadDefaultInputSuccess
  | LoadDefaultInputFail
  | RunSimulation
  | RunSimulationSuccess
  | RunSimulationFail
  | ResetSimulationResult;
