import * as fromReducers from './ntt_enctemp.reducer';
import * as fromActions from '../actions/ntt_enctemp.actions';
import {
  ChartOptions,
  InitUIValuesModel,
  NTTEncTempInputModel,
  NTTEncTempOutputModel } from '../../core/models';

describe('[NTTEncTemp] Reducer', () => {

  describe('Loading Default Input', () => {
    it('should set loading to true and input, output, default_ui_values is vacant', () => {
      const initial_state = fromReducers.initialState;
      const action = new fromActions.LoadDefaultInput;
      const state = fromReducers.reducer(initial_state, action);
      expect(state.loading).toEqual(true);
      expect(state.input).toEqual({});
      expect(state.output_body_results).toEqual({});
      expect(state.output_head).toEqual({});
      expect(state.default_params).toEqual({});
      expect(state.default_options).toEqual({});
      expect(state.select_options).toEqual({});
      expect(state.chart_options).toEqual({});
    });
  });

  describe('LoadDefaultInputSuccess', () => {
    it('should set loading to false and default_ui_values is set', () => {
      const initial_state = fromReducers.initialState;
      const payload: InitUIValuesModel = {
        'ui_set_value': {
          'head': {
            'index': 0,
            'simulation_model_name': 'NTT.modelica_ENC_Unit_Test',
            'status': 'Success',
            'version': '1.0.0',
            'data_length': 0
          },
          'body': {
            'default_values': {
              'simulation_options': {
                'startTime': 0.0,
                'stopTime': 1.0,
                'stepSize': 1.0e-06,
                'solver': 'dassl'
              },
              'parameters': {
                'T_fixed': 291.15,
                'T_st_enc': 293.15,
                'T_st_unit': 294.15,
                'cp_enc': 24.0,
                'cp_unit': 24.0,
                'depth_enc': 0.5,
                'depth_unit': 0.1,
                'e_unit': 0.7,
                'ein_enc': 0.7,
                'eout_enc': 0.7,
                'height_enc': 0.5,
                'height_unit': 0.1,
                'ke_enc': 50.0,
                'power_unit': 10.0,
                'ro_enc': 3.75,
                'thickness_enc': 0.002,
                'width_enc': 0.5,
                'width_unit': 0.1
              }
            },
            'select_options': {
              'tolerance': [
                {label: '1e-2', value: 1.0e-2},
                {label: '1e-3', value: 1.0e-3},
                {label: '1e-4', value: 1.0e-4},
                {label: '1e-5', value: 1.0e-5},
                {label: '1e-6', value: 1.0e-6},
                {label: '1e-7', value: 1.0e-7},
                {label: '1e-8', value: 1.0e-8},
                {label: '1e-9', value: 1.0e-9},
                {label: '1e-10', value: 1.0e-10},
                {label: '1e-11', value: 1.0e-11},
                {label: '1e-12', value: 1.0e-12}
              ],
              'solver': [
                {label: 'Euler', value: 'euler'},
                {label: 'Heun', value: 'heun'},
                {label: 'RungeKutta', value: 'rungekutta'},
                {label: 'ImpRuler', value: 'impeuler'},
                {label: 'Trapezoid', value: 'trapezoid'},
                {label: 'ImpRungeKutta', value: 'imprungekutta'},
                {label: 'Irksco', value: 'irksco'},
                {label: 'Dassl', value: 'dassl'},
                {label: 'Ida', value: 'ida'},
                {label: 'RungeKuttaSSC', value: 'rungekuttassc'},
              ],
            },
            'solution_options': {
              'available_solutions': [
                'time',
                'modelicaUnit1.sFront',
                'modelicaUnit1.sLeft'
              ]
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
      const chart_options_expected: ChartOptions = {
        height: 500,
        animateDuration: 1000,
        margin: 40
      };
      expect(state.chart_options).toEqual(chart_options_expected);
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
      const payload: NTTEncTempInputModel = {
        'simulation_input': {
          'head': {
            'index': 0,
            'simulation_model_name': 'NTT.modelica_ENC_Unit_Test',
            'version': '1.0.0'
          },
          'body': {
            'simulation_options': {
              'startTime': 0.0,
              'stopTime': 10.0,
              'stepSize': 0.02,
              'tolerance': 1.0e-6,
              'solver': 'dassl'
            },
            'parameters': {
              'T_fixed': 291.15,
              'T_st_enc': 293.15,
              'T_st_unit': 294.15,
              'cp_enc': 24.0,
              'cp_unit': 24.0,
              'depth_enc': 0.5,
              'depth_unit': 0.1,
              'e_unit': 0.7,
              'ein_enc': 0.7,
              'eout_enc': 0.7,
              'height_enc': 0.5,
              'height_unit': 0.1,
              'ke_enc': 3.75,
              'power_unit': 10.0,
              'ro_enc': 3.75,
              'thickness_enc': 0.002,
              'width_enc': 0.5,
              'width_unit': 0.1
            },
            'results_options': {
              'target_results': [
                'time',
                'modelicaUnit1.convTop.fluid.T',
                'modelicaUnit1.convTop.solid.T'
              ]
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
      const payload: NTTEncTempOutputModel = {
        'simulation_output': {
          'head': {
            'index': 0,
            'simulation_model_name': 'NTT.modelica_ENC_Unit_Test',
            'status': 'Success',
            'version': '1.0.0',
            'data_length': 6
          },
          'body': {
            'results': {
              'time': [0, 0.02, 0.04, 0.06, 0.08, 1.0],
              'modelicaUnit1_convTop_fluid_T': [
                293.2662, 292.7148, 292.3618, 292.1341, 291.9860, 291.8898
              ],
              'modelicaUnit1_convTop_solid_T': [
                294.15, 294.1579, 294.1657, 294.1733, 294.1809, 294.1885
              ]
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

  describe('ResetSimulationResult', () => {
    it('should reset simulation results', () => {
      const initial_state = fromReducers.initialState;
      const action = new fromActions.ResetSimulationResult();
      const state = fromReducers.reducer(initial_state, action);
      expect(state.output_head).toEqual({});
      expect(state.output_body_results).toEqual({});
    });
  });
});
