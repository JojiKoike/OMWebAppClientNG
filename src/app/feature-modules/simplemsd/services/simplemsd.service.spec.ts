/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SimpleMSDService } from './simplemsd.service';
import {
  InitUIValuesModel, SimpleMSDInputModel, SimpleMSDOutputModel,
  SolutionOptionsModel,
  UISetValueHead, UISetValueBody, UISetValue,
  SimulationOptionsModel,
  SimulationParametersModel,
  SelectOptionsModel,
  DefaultValuesModel
} from '../core/models';

describe('Service: Simplemsd', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let simpleMSDService: SimpleMSDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimpleMSDService]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    simpleMSDService = TestBed.get(SimpleMSDService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  // Tests begin //
  describe('#getDefaultInput', () => {

    beforeEach(() => {
      simpleMSDService = TestBed.get(SimpleMSDService);
    });

    it('should return expected default values', () => {
      // Set Expected Value
      let expectedValue: InitUIValuesModel;
      // Head
      const uiSetValueHead = new UISetValueHead(0, 'SimpleMSD', 'Success', '1.0.0', 0);
      // Body
      const simulationOptions = new SimulationOptionsModel(0.0, 10.0, 0.02, 1e-06, 'dassl');
      const simulationParameters = new SimulationParametersModel(1.0, 2.0, 1.0, 5.0);
      const selectOptions = new SelectOptionsModel(
        {'1e-2': 1e-02, '1e-3': 1e-03, '1e-4': 1e-04, '1e-5': 1e-05,
        '1e-6': 1e-06, '1e-7': 1e-07, '1e-8': 1e-08, '1e-9': 1e-09, '1e-10': 1e-10,
        '1e-11': 1e-11, '1e-12': 1e-12},
        {'Euler': 'euler', 'Heun': 'heun', 'RungeKutta': 'rungekutta',
        'ImpEuler': 'impeuler', 'Trapezoid': 'trapezoid', 'ImpRungeKutta': 'imprungekutta',
        'Irksco': 'irksco', 'Dassl': 'dassl', 'Ida': 'ida', 'RungeKuttaSSC': 'rungekuttassc'}
        );
      const solutionOptions = new SolutionOptionsModel(['der(v)', 'der(v)', 'time', 'v', 'x']);
      const defaultValues = new DefaultValuesModel(simulationOptions, simulationParameters);
      const uiSetValueBody = new UISetValueBody(defaultValues, selectOptions, solutionOptions);
      expectedValue = new InitUIValuesModel(new UISetValue(uiSetValueHead, uiSetValueBody));

      // Run Test
      simpleMSDService.getDefaultInput().subscribe(
        data => expect(data).toEqual(expectedValue),
        fail
      );

      // Mock Server
      const requestURL = 'http://localhost:8080/simplemsd';
      const req = httpTestingController.expectOne(requestURL);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedValue);
    });
  });

  describe('#runSimulation', () => {

    beforeEach(() => {
      simpleMSDService = TestBed.get(SimpleMSDService);
    });

    it('should return expected output values', () => {
      // Set Expected Value
      const inputValue: SimpleMSDInputModel = {
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
      const expectedOutputValue: SimpleMSDOutputModel = {
        'simulation_output': {
          'head': {
            'index': 0,
            'simulation_model_name': 'SimpleMSD',
            'status': 'Success',
            'version': '1.0.0'
          },
          'body': {
            'results': {
              'time': [0.0, 0.02, 0.04, 0.06, 0.08],
              'x': [0.0, 0.09899295817346851, 0.1959476570140554, 0.2908277884249372, 0.3835990586855771],
              'v': [5.0, 4.89902146293283, 4.796161520179167, 4.691538435132714, 4.585271405399107]
            }
          }
        }
      };

      // Run Test
      simpleMSDService.runSimulation(inputValue).subscribe(
        data => expect(data).toEqual(expectedOutputValue, 'should return the simulation result'),
        fail
      );

      // Mock Server
      const requestURL = 'http://localhost:8080/simplemsd';
      const req = httpTestingController.expectOne(requestURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(inputValue);
      const expectedResponse = new HttpResponse({
        status: 200, statusText: 'OK', body: expectedOutputValue
      });
      req.event(expectedResponse);
    });
  });
});
