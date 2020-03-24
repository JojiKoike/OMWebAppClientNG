import { SimpleMSDActions, SimpleMSDActionTypes } from '../actions/simplemsd.action';
import { SimulationParametersModel, SimpleMSDInputModel } from '../../core/models';
import { SelectOptionsModel, SimulationOptionsModel, SolutionOptionsModel } from '../../core/models/simplemsd.uidefaultvalues.model';
import { Results, SimulationOutputHead } from '../../core/models/simplemsd.output.model';


/**
 * State
 */
export interface State {
  loading: boolean;
  input: SimpleMSDInputModel;
  default_params: SimulationParametersModel;
  default_options: SimulationOptionsModel;
  select_options: SelectOptionsModel;
  solution_options: SolutionOptionsModel;
  output_head: SimulationOutputHead;
  output_body_results: Results;
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
  output_body_results: {}
};


/**
 * Reducer function
ssss */
export function reducer(
  state = initialState,
  action: SimpleMSDActions
): State {
  switch (action.type) {
    // Load Default Inputs
    case SimpleMSDActionTypes.LoadDefaultInput: {
      return { ...state, loading: true };
    }
    case SimpleMSDActionTypes.LoadDefaultInputSuccess: {
      const { output } = action.payload;
      return { ...state, loading: false,
        default_params: output.ui_set_value.body.default_values.parameters,
        default_options: output.ui_set_value.body.default_values.simulation_options,
        select_options: output.ui_set_value.body.select_options,
        solution_options: output.ui_set_value.body.solution_options
      };
    }
    case SimpleMSDActionTypes.LoadDefaultInputFail: {
      return { ...state, loading: false };
    }
    // Run Simulation
    case SimpleMSDActionTypes.RunSimulation: {
      const { input } = action.payload;
      return { ...state, loading: true, input: input };
    }
    case SimpleMSDActionTypes.RunSimulationSuccess: {
      const { output } = action.payload;
      return { ...state, loading: false,
        output_head: output.simulation_output.head,
        output_body_results: output.simulation_output.body.results};
    }
    case SimpleMSDActionTypes.RunSimulationFail: {
      return { ...state, loading: false };
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
