import {
  SimpleMSDActionTypes,
  LoadDefaultInput,
  LoadDefaultInputFail,
  LoadDefaultInputSuccess,
  RunSimulation,
  RunSimulationSuccess,
  RunSimulationFail } from './simplemsd.action';

import {
  SimpleMSDInputModel,
  SimpleMSDOutputModel,
  InitUIValuesModel
} from '../../core/models';

describe('[SimpleMSD] LoadDefaultInput', () => {
  it('should create LoadDefaultInput action', () => {
    const action = new LoadDefaultInput();
    expect(action.type).toEqual(SimpleMSDActionTypes.LoadDefaultInput);
  });
});

describe('[SimpleMSD] LoadDefaultInputSuccess', () => {
  it('should create LoadDefaultInputSuccess action', () => {
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
            'available_solutions': ['der(v)', 'der(x)', 'time', 'v', 'x']
          }
        }
      }
    };

    const action = new LoadDefaultInputSuccess({output: payload});
    expect({ ...action }).toEqual({
      type: SimpleMSDActionTypes.LoadDefaultInputSuccess,
      payload: { output: payload}
    });
  });
});

describe('[SimpleMSD] LoadDefaultInputFail', () => {
  it('should create LoadDefaultInputFail action', () => {
    const action = new LoadDefaultInputFail();
    expect(action.type).toEqual(SimpleMSDActionTypes.LoadDefaultInputFail);
  });
});

describe('[SimpleMSD] RunSimulation', () => {
  it('should create RunSimulation action', () => {
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
            'target_results': ['x', 'v', 'time']
          }
        }
      }
    };
    const action = new RunSimulation({input: payload});
    expect({ ...action }).toEqual({
      type: SimpleMSDActionTypes.RunSimulation,
      payload: {input: payload}
    });
  });
});

describe('[SimpleMSD] RunSimulationSuccess', () => {
  it('should create RunSimulationSuccess action', () => {
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
    const action = new RunSimulationSuccess({output: payload});
    expect({ ...action }).toEqual({
      type: SimpleMSDActionTypes.RunSimulationSuccess, payload: {output: payload}});
  });
});

describe('[SimpleMSD] RunSimulationFail', () => {
  it('should create RunSimulationFail action', () => {
    const action = new RunSimulationFail();
    expect(action.type).toEqual(SimpleMSDActionTypes.RunSimulationFail);
  });
});
