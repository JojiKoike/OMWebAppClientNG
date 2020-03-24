import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold, initTestScheduler} from 'jasmine-marbles';
import { Observable } from 'rxjs';


import {
  InitUIValuesModel,
  NTTEncTempInputModel,
  NTTEncTempOutputModel
} from '../../core/models';
import { NTTEncTempService } from '../../services';
import { NTTEncTempEffects } from './ntt_enctemp.effects';
import {
  LoadDefaultInput,
  LoadDefaultInputSuccess,
  LoadDefaultInputFail,
  RunSimulation,
  RunSimulationSuccess,
  RunSimulationFail
} from '../actions';

describe('[NTTEncTemp] Effects Test', () => {
  let actions$: Observable<any>;
  let effects: NTTEncTempEffects;
  let service: NTTEncTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NTTEncTempEffects,
        provideMockActions(() => actions$),
        {
          provide: NTTEncTempService,
          useValue: jasmine.createSpyObj('NTTEncTempService', ['getDefaultInput', 'runSimulation']),
        }
      ],
    });
    effects = TestBed.get(NTTEncTempEffects);
    service = TestBed.get(NTTEncTempService);
    // jasmine-marbles 0.3.x seems not work properly with RxJS 6
    // See https://github.com/synapse-wireless-labs/jasmine-marbles/issues/21
    // According to this issue, need initTestScheduler()
    initTestScheduler();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('loadDefaultInput$ Success', () => {
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
              'tolerance': 1.0e-06,
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
    const action = new LoadDefaultInput();
    const completion = new LoadDefaultInputSuccess({ output: payload });

    // Hot means Hot Observable (emits item as soon as created)
    actions$ = hot('-a', { a: action });
    // Cold means Cold Observable (wait observer subscribes)
    const response = cold('-b', { b: payload });
    const expected = cold('--c', { c: completion });
    service.getDefaultInput = () => response;

    expect(effects.loadDefaultInput$).toBeObservable(expected);
  });

  it('loadDefaultInputs$ Failed', () => {
    const error: InitUIValuesModel = {
      'ui_set_value': {
        'head': {
          'index': 0,
          'simulation_model_name': 'NTT.modelica_ENC_Unit_Test',
          'status': 'Failed',
          'version': '1.0.0',
          'data_length': 0
        },
        'body': {
          'default_values': {
            'simulation_options': null,
            'parameters': null
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
            'available_solutions': null
          }
        }
      }
    };
    const action = new LoadDefaultInput();
    const completion = new LoadDefaultInputFail({ error: error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--c', { c: completion });
    service.getDefaultInput = () => response;

    expect(effects.loadDefaultInput$).toBeObservable(expected);
  });

  const input: NTTEncTempInputModel = {
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

  it('runSimulation$ Success', () => {
   const action = new RunSimulation({input: input});
   const output: NTTEncTempOutputModel = {
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
    const completion = new RunSimulationSuccess({ output: output });

    actions$ = hot('-a', { a: action });
    const response = cold('-b', { b: output });
    const expected = cold('--c', { c: completion });
    service.runSimulation = () => response;

    expect(effects.runSimulation$).toBeObservable(expected);
  });

  it('runSimulation$ Failed', () => {
    const error: NTTEncTempOutputModel = {
      'simulation_output': {
        'head': {
          'index': 0,
          'simulation_model_name': 'NTT.modelica_ENC_Unit_Test',
          'status': 'Failed',
          'version': '1.0.0',
          'data_length': 0
        },
        'body': {
          'results': null
        }
      }
    };
    const action = new RunSimulation({ input: input });
    const completion = new RunSimulationFail({ error: error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--c', { c: completion });
    service.runSimulation = () => response;

    expect(effects.runSimulation$).toBeObservable(expected);
  });
});
