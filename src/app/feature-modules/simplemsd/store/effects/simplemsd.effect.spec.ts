import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold, initTestScheduler } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import {
  InitUIValuesModel,
  SimpleMSDInputModel,
  SimpleMSDOutputModel
 } from '../../core/models';
import { SimpleMSDService } from '../../services';
import { SimpleMSDEffects } from '../effects';
import {
  LoadDefaultInput,
  LoadDefaultInputSuccess,
  LoadDefaultInputFail,
  RunSimulation,
  RunSimulationSuccess,
  RunSimulationFail
} from '../actions';


describe('[SimpleMSD] Effects Test', () => {
  let actions$: Observable<any>;
  let effects: SimpleMSDEffects;
  let service: SimpleMSDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SimpleMSDEffects,
        provideMockActions(() => actions$),
        {
          provide: SimpleMSDService,
          useValue: jasmine.createSpyObj('SimpleMSDService', ['getDefaultInput', 'runSimulation']),
        }
      ],
    });
    effects = TestBed.get(SimpleMSDEffects);
    service = TestBed.get(SimpleMSDService);
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
          'simulation_model_name': 'SimpleMSD',
          'version': '1.0.0',
          'status': 'Success',
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
    const error = 'error';
    const action = new LoadDefaultInput();
    const completion = new LoadDefaultInputFail({ error: error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--c', { c: completion });
    service.getDefaultInput = () => response;

    expect(effects.loadDefaultInput$).toBeObservable(expected);
  });

  it('runSimulation$ Success', () => {
    const input: SimpleMSDInputModel = {
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
            'target_results': ['time', 'v', 'x']
          }
        }
      }
    };
    const action = new RunSimulation({input: input});
    const output: SimpleMSDOutputModel = {
      'simulation_output': {
        'head': {
          'index': 0,
          'simulation_model_name': 'SimpleMSD',
          'status': 'Success',
          'version': '1.0.0',
          'data_length': 5
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
    const completion = new RunSimulationSuccess({ output: output });

    actions$ = hot('-a', { a: action });
    const response = cold('-b', { b: output });
    const expected = cold('--c', { c: completion });
    service.runSimulation = () => response;

    expect(effects.runSimulation$).toBeObservable(expected);
  });

  it('runSimulation$ Failed', () => {
    const error = 'error';
    const input: SimpleMSDInputModel = {
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
    const action = new RunSimulation({ input: input });
    const completion = new RunSimulationFail({ error: error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--c', { c: completion });
    service.runSimulation = () => response;

    expect(effects.runSimulation$).toBeObservable(expected);
  });
});
