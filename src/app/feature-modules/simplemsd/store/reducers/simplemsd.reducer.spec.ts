import * as fromReducers from './simplemsd.reducer';
import * as fromActions from '../actions/simplemsd.action';
import {
  InitUIValuesModel,
  SimpleMSDInputModel,
  SimpleMSDOutputModel } from '../../core/models';

describe('[SimpleMSD] Reducer', () => {

  describe('LoadingDefaultInput', () => {
    it('should set loading to true and input, output, default_ui_values is vacant', () => {
      const initial_state = fromReducers.initialState;
      const action = new fromActions.LoadDefaultInput();
      const state = fromReducers.reducer(initial_state, action);
      expect(state.loading).toEqual(true);
      expect(state.input).toEqual({});
      expect(state.output_body_results).toEqual({});
      expect(state.output_head).toEqual({});
      expect(state.default_params).toEqual({});
      expect(state.default_options).toEqual({});
      expect(state.select_options).toEqual({});
    });
  });

  describe('LoadingDefaultInputSuccess', () => {
    it('should set loading to false and default_ui_values is set', () => {
      const initial_state = fromReducers.initialState;
      const payload: InitUIValuesModel = {
        'ui_set_value': {
          'head': {
            'index': 0,
            'simulation_model_name': 'SimpleMSD',
            'status': 'Success',
            'version': '1.0.0',
            'data_length': 0
          },
          'body': {
            'default_values': {
              'simulation_options': {
                'startTime': 0.0,
                'stopTime': 10.0,
                'stepSize': 0.02,
                'tolerance': 1.0e-06,
                'solver': 'dassl'
              },
              'parameters': {
                'm': 1.0,
                'k': 2.0,
                'c': 1.0,
                'v0': 5.0
              }
            },
            'select_options': {
              'tolerance': {
                '1e-2': 1.0e-2, '1e-3': 1.0e-3, '1e-4': 1.0e-4,
                '1e-5': 1.0e-5, '1e-6': 1.0e-6, '1e-7': 1.0e-7,
                '1e-8': 1.0e-8, '1e-9': 1.0e-9, '1e-10': 1.0e-10,
                '1e-11': 1.0e-11, '1e-12': 1.0e-12
              },
              'solver': {
                'Eular': 'euler', 'Heun': 'heun',
                'RungeKutta': 'rungekutta', 'ImpEuler': 'impeuler', 'Trapezoid': 'trapezoid',
                'ImpRungeKutta': 'imprungekutta', 'Irksco': 'irksco', 'Dassl': 'dassl',
                'Ida': 'ida', 'RungeKuttaSSC': 'rungekuttassc'
              }
            },
            'solution_options': {
              'available_solutions': ['time', 'x', 'v', 'der(x)', 'der(v)']
            }
          }
        }
       };
      const action = new fromActions.LoadDefaultInputSuccess({output: payload});
      const state = fromReducers.reducer(initial_state, action);
      expect(state.loading).toEqual(false);
      expect(state.default_params).toEqual(payload.ui_set_value.body.default_values.parameters);
      expect(state.default_options).toEqual(payload.ui_set_value.body.default_values.simulation_options);
      expect(state.select_options).toEqual(payload.ui_set_value.body.select_options);
      expect(state.solution_options).toEqual(payload.ui_set_value.body.solution_options);
      expect(state.input).toEqual({});
      expect(state.output_head).toEqual({});
      expect(state.output_body_results).toEqual({});
    });
  });

  describe('LoadDefaultInputFail', () => {
    it('should set loading to false and other state are vacant', () => {
      const initial_state = fromReducers.initialState;
      const action = new fromActions.LoadDefaultInputFail();
      const state = fromReducers.reducer(initial_state, action);
      expect(state.loading).toEqual(false);
      expect(state.default_params).toEqual({});
      expect(state.default_options).toEqual({});
      expect(state.select_options).toEqual({});
      expect(state.input).toEqual({});
      expect(state.output_head).toEqual({});
      expect(state.output_body_results).toEqual({});
    });
  });

  describe('RunSimulation', () => {
    it('should set loading to true and input', () => {
      const initial_state = fromReducers.initialState;
      const payload: SimpleMSDInputModel = {
        'simulation_input': {
          'head': {
              'index': 0,
              'simulation_model_name': 'SimpleMSD',
              'version': '1.0.0'
          },
          'body': {
            'simulation_options': {
              'startTime': 0.0,
              'stopTime': 5.0,
              'stepSize': 0.02,
              'tolerance': 1.0e-6,
              'solver': 'dassl'
            },
            'parameters': {
              'm': 1.0,
              'k': 2.0,
              'c': 1.0,
              'v0': 5.0
            },
            'results_options': {
              'target_results': ['time', 'x', 'v']
            }
          }
        }
      };
      const action = new fromActions.RunSimulation({input: payload});
      const state = fromReducers.reducer(initial_state, action);
      expect(state.loading).toEqual(true);
      expect(state.input).toEqual(payload);
      expect(state.default_params).toEqual({});
      expect(state.default_options).toEqual({});
      expect(state.select_options).toEqual({});
      expect(state.output_head).toEqual({});
      expect(state.output_body_results).toEqual({});
    });
  });

  describe('RunSimulationSuccess', () => {
    it('should set loading to false and output is set', () => {
      const initial_state = fromReducers.initialState;
      const payload: SimpleMSDOutputModel = {
        'simulation_output': {
          'head': {
            'index': 0,
            'simulation_model_name': 'SimpleMSD',
            'status': 'Success',
            'version': '1.0.0'
          },
          'body': {
            'results': {
              'x': [0.0, 0.09899295817346851, 0.1959476570140554, 0.2908277884249372, 0.3835990586855771],
              'v': [5.0, 4.89902146293283, 4.796161520179167, 4.691538435132714, 4.585271405399107],
              'time': [0.0, 0.02, 0.04, 0.06, 0.08]
            }
          }
        }
      };
      const action = new fromActions.RunSimulationSuccess({output: payload});
      const state = fromReducers.reducer(initial_state, action);
      expect(state.loading).toEqual(false);
      expect(state.default_params).toEqual({});
      expect(state.default_options).toEqual({});
      expect(state.select_options).toEqual({});
      expect(state.input).toEqual({});
      expect(state.output_head).toEqual(payload.simulation_output.head);
      expect(state.output_body_results).toEqual(payload.simulation_output.body.results);
    });
  });

  describe('RunSimulationFail', () => {
    it('should set loading to false and other state is vacant', () => {
      const initial_state = fromReducers.initialState;
      const action = new fromActions.RunSimulationFail();
      const state = fromReducers.reducer(initial_state, action);
      expect(state.loading).toEqual(false);
      expect(state.default_params).toEqual({});
      expect(state.default_options).toEqual({});
      expect(state.select_options).toEqual({});
      expect(state.input).toEqual({});
      expect(state.output_head).toEqual({});
      expect(state.output_body_results).toEqual({});
    });
  });
});
