import {
  NTTEncTempActionTypes,
  LoadDefaultInput,
  LoadDefaultInputSuccess,
  LoadDefaultInputFail,
  RunSimulation,
  RunSimulationSuccess,
  RunSimulationFail,
  ResetSimulationResult
} from './ntt_enctemp.actions';


import {
  NTTEncTempInputModel,
  NTTEncTempOutputModel,
  InitUIValuesModel
} from '../../core/models';


describe('[NTTEncTemp] LoadDefaultInput', () => {
  it('should create LoadDefaultInput action', () => {
    const action = new LoadDefaultInput();
    expect(action.type).toEqual(NTTEncTempActionTypes.LoadDefaultInput);
  });
});

describe('[NTTEncTemp] LoadDefaultInputSuccess', () => {
  it('should create LoadDefaultInputSuccess action', () => {
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
              'stepSize': 0.002,
              'tolerance': 0.000001,
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
            'available_solutions': []
          }
        }
      }
    };

    const action = new LoadDefaultInputSuccess({output: payload});
    expect({ ...action }).toEqual({
      type: NTTEncTempActionTypes.LoadDefaultInputSuccess,
      payload: { output: payload }
    });
  });
});

describe('[NTTEncTemp] LoadDefaultInputFail', () => {
  it('should create LoadDefaultInputFail action', () => {
    const action = new LoadDefaultInputFail();
    expect(action.type).toEqual(NTTEncTempActionTypes.LoadDefaultInputFail);
  });
});

describe('[NTTEncTemp] RunSimulation', () => {
  it('should create RunSimulation action', () => {
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
            'ke_enc': 50,
            'power_unit': 10.0,
            'ro_enc': 3.75,
            'thickness_enc': 0.002,
            'width_enc': 0.5,
            'width_unit': 0.1
          },
          'results_options': {
            'target_results': [
              'time',
              'modelicaUtil1.convTop.fluid.T',
              'modelicaUtil1.convTop.solid.T'
            ]
          }
        }
      }
    };
    const action = new RunSimulation({input: payload});
    expect({ ...action }).toEqual({
      type: NTTEncTempActionTypes.RunSimulation,
      payload: {input: payload}
    });
  });
});

describe('[NTTEncTemp] RunSimulationSuccess', () => {
  it('should create RunSimulationSuccess action', () => {
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
            'time': [0, 0.2, 0.4, 0.6, 0.8, 1.0],
            'modelicaUnit1_convTop_fluid_T': [293.14, 293.15, 293.16, 293.17, 293.18, 293.20],
            'modelicaUnit1_convTop_solid_T': [302.15, 302.16, 302.17, 302.18, 302.19, 302.20]
          }
        }
      }
    };
    const action = new RunSimulationSuccess({output: payload});
    expect({ ...action }).toEqual({
      type: NTTEncTempActionTypes.RunSimulationSuccess, payload: {output: payload} });
  });
});

describe('[NTTEncTemp] RunSimulationFail', () => {
  it('should create RunSimulationFail action', () => {
    const action = new RunSimulationFail();
    expect(action.type).toEqual(NTTEncTempActionTypes.RunSimulationFail);
  });
});

describe('[NTTEncTemp] ResetSimulationResult', () => {
  it('should create ResetSimulationResult action', () => {
    const  action = new ResetSimulationResult();
    expect(action.type).toEqual(NTTEncTempActionTypes.ResetSimulationResult);
  });
});
