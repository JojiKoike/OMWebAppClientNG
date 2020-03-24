import { NTTEncTempActions, NTTEncTempActionTypes } from '../actions/ntt_enctemp.actions';
import {
  SelectOptionsModel, NTTEncTempInputModel,
  SimulationOptionsModel, SimulationParametersModel, SolutionOptionsModel,
  Results, SimulationOutputHead, ChartOptions
} from '../../core/models';

export interface State {
  loading: boolean;
  input: NTTEncTempInputModel;
  default_params: SimulationParametersModel;
  default_options: SimulationOptionsModel;
  select_options: SelectOptionsModel;
  solution_options: SolutionOptionsModel;
  output_head: SimulationOutputHead;
  output_body_results: Results;
  chart_options: ChartOptions;
}


/**
 * Initial state
 */
export const initialState: State = {
  loading: false,
  input: {},
  default_params: {},
  default_options: {},
  select_options: {},
  solution_options: {},
  output_head: {},
  output_body_results: {},
  chart_options: {}
};

export function reducer(
  state = initialState,
  action: NTTEncTempActions
): State {
  switch (action.type) {
    // Load Default Inputs
    case NTTEncTempActionTypes.LoadDefaultInput: {
      return { ...state, loading: true };
    }
    case NTTEncTempActionTypes.LoadDefaultInputSuccess: {
      const { output } = action.payload;
      return {
        ...state, loading: false,
        default_params: output.ui_set_value.body.default_values.parameters,
        default_options: output.ui_set_value.body.default_values.simulation_options,
        select_options: output.ui_set_value.body.select_options,
        solution_options: output.ui_set_value.body.solution_options,
        chart_options: {
          height: 500,
          animateDuration: 1000,
          margin: 40
        }
      };
    }
    case NTTEncTempActionTypes.LoadDefaultInputFail: {
      return { ...state, loading: false };
    }
    // Run Simulation
    case NTTEncTempActionTypes.RunSimulation: {
      const { input } = action.payload;
      return { ...state, loading: true, input: input };
    }
    case NTTEncTempActionTypes.RunSimulationSuccess: {
      const { output } = action.payload;
      return {
        ...state, loading: false,
        output_head: output.simulation_output.head,
        output_body_results: output.simulation_output.body.results,
      };
    }
    case NTTEncTempActionTypes.RunSimulationFail: {
      return { ...state, loading: false };
    }
    case NTTEncTempActionTypes.ResetSimulationResult: {
      return { ...state, output_head: {}, output_body_results: {}};
    }
    // Undefined Action specified case
    default: {
      return state;
    }
  }
}

/**
 * Selectors
 */
export const getLoading = (state: State) => state.loading;
export const getInput = (state: State) => state.input;
export const getDefaultParams = (state: State) => state.default_params;
export const getDefaultOptions = (state: State) => state.default_options;
export const getSelectOptions = (state: State) => state.select_options;
export const getOutputHead = (state: State) => state.output_head;
export const getOutputBodyResults = (state: State) => state.output_body_results;
export const getChartOptions = (state: State) => state.chart_options;
