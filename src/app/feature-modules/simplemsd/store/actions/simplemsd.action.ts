import { Action } from '@ngrx/store';
import { InitUIValuesModel, SimpleMSDInputModel, SimpleMSDOutputModel } from '../../core/models';


/**
 * Action Types
 */
export enum SimpleMSDActionTypes {
  LoadDefaultInput          = '[SimpleMSD] Load Default Input',
  LoadDefaultInputSuccess   = '[SimpleMSD] Load Default Input Success',
  LoadDefaultInputFail      = '[SimpleMSD] Load Default Input Fail',
  RunSimulation             = '[SimpleMSD] Run Simulation',
  RunSimulationSuccess      = '[SimpleMSD] Run Simulation Success',
  RunSimulationFail         = '[SimpleMSD] Run Simulation Fail'
}


/**
 * Load Default Input
 */
export class LoadDefaultInput implements Action {
  readonly type = SimpleMSDActionTypes.LoadDefaultInput;
}

/**
 * Load Default Input Success
 */
export class LoadDefaultInputSuccess implements Action {
  readonly type = SimpleMSDActionTypes.LoadDefaultInputSuccess;
  constructor(public payload: { output: InitUIValuesModel }) {}
}

/**
 * Load Default Input Fail
 */
export class LoadDefaultInputFail implements Action {
  readonly type = SimpleMSDActionTypes.LoadDefaultInputFail;
  constructor(public payload?: { error: any }) {}
}

/**
 * Run Simulation
 */
export class RunSimulation implements Action {
  readonly type = SimpleMSDActionTypes.RunSimulation;
  constructor(public payload: { input: SimpleMSDInputModel }) {
    this.payload = payload;
  }
}

/**
 * Run Simulation Success
 */
export class RunSimulationSuccess implements Action {
  readonly type = SimpleMSDActionTypes.RunSimulationSuccess;
  constructor(public payload: { output: SimpleMSDOutputModel }) {}
}

/**
 * Run Simulation Fail
 */
export class RunSimulationFail implements Action {
  readonly type = SimpleMSDActionTypes.RunSimulationFail;
  constructor(public payload?: { error: any }) {}
}


/**
 * Actions
 */
export type SimpleMSDActions =
  | LoadDefaultInput
  | LoadDefaultInputSuccess
  | LoadDefaultInputFail
  | RunSimulation
  | RunSimulationSuccess
  | RunSimulationFail;
