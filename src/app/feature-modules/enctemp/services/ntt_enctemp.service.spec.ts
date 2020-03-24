/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NTTEncTempService } from './ntt_enctemp.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { InitUIValuesModel, NTTEncTempInputModel, NTTEncTempOutputModel,
  SolutionOptionsModel, UISetValueHead, UISetValueBody, UISetValue,
  SimulationOptionsModel, SimulationParametersModel, SelectOptionsModel, DefaultValuesModel
} from '../core/models';

describe('Service: Enctemp', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let encTempService: NTTEncTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NTTEncTempService]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    encTempService = TestBed.get(NTTEncTempService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#getDefaultInput', () => {
    beforeEach(() => {
      encTempService = TestBed.get(NTTEncTempService);
    });

    it('should return expected default values', () => {
      // Set Expected Value
      let expectedValue: InitUIValuesModel;
      // Head
      const uiSetValueHead = new UISetValueHead(
        0, 'NTT.modelica_ENC_Unit_Test', 'Success', '1.0.0', 0);
      // Body
      const simulationOptions = new SimulationOptionsModel(0.0, 500.0, 0.02, 1e-06, 'dassl');
      const simulationParameters = new SimulationParametersModel(
        291.15, 293.15, 294.15, 24.0, 24.0, 0.5, 0.2, 0.7, 0.7, 0.7, 0.5, 0.1,
        50.0, 10.0, 3.75, 0.002, 0.5, 0.1);
      const selectOptions = new SelectOptionsModel(
        [
          {label: '1e-2', value: 1e-2},
          {label: '1e-3', value: 1e-3},
          {label: '1e-4', value: 1e-4},
          {label: '1e-5', value: 1e-5},
          {label: '1e-6', value: 1e-6},
        ],
        [
          {label: 'Euler', value: 'euler'},
          {label: 'Heun', value: 'heun'},
          {label: 'Dassl', value: 'dassl'}
        ]
      );
      const solutionOptions = new SolutionOptionsModel(['modelicaEnc.sFront, modelicaEnc.sLeft']);
      const defaultValues = new DefaultValuesModel(simulationOptions, simulationParameters);
      const uiSetValueBody = new UISetValueBody(defaultValues, selectOptions, solutionOptions);
      expectedValue = new InitUIValuesModel(new UISetValue(uiSetValueHead, uiSetValueBody));

      // Run Test
      encTempService.getDefaultInput().subscribe(
        data => expect(data).toEqual(expectedValue),
        fail
      );

      // Mock Server
      const requestURL = 'http://localhost:8080/ntt/airtightenctemp';
      const req = httpTestingController.expectOne(requestURL);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedValue);
    });
  });

  describe('#runSimulation', () => {

    beforeEach(() => {
      encTempService = TestBed.get(NTTEncTempService);
    });

    it('should return expected output values', () => {
      const inputValue: NTTEncTempInputModel = {
        'simulation_input': {
          'head': {
            'index': 0,
            'simulation_model_name': 'NTT.modelica_ENC_Unit_Test',
            'version': '1.0.0'
          },
          'body': {
            'simulation_options': {
              'startTime': 0.0,
              'stopTime': 500.0,
              'stepSize': 1.0,
              'tolerance': 1e-06,
              'solver': 'dassl'
            },
            'parameters': {
              'T_fixed': 291.15,
              'T_st_enc': 293.15,
              'T_st_unit': 294.15,
              'cp_enc': 24,
              'cp_unit': 24,
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
                'modelicaUnit1.convTop.fluid.T',
                'modelicaUnit1.convTop.solid.T'
              ]
            }
          }
        }
      };
      const expectedOutputValue: NTTEncTempOutputModel = {
        'simulation_output': {
          'head': {
            'index': 0,
            'simulation_model_name': 'NTT.modelica_ENC_Unit_Test',
            'status': 'Success',
            'version': '1.0.0',
            'data_length': 502
          },
          'body': {
            'results': {
              'time': [0.0, 1.0, 2.0, 3.0, 4.0, 5.0],
              'modelicaUnit1_convTop_fluid_T': [293.266, 291.754, 291.833, 291.901, 291.969],
              'modelicaUnit1_convTop_solid_T': [294.15, 294.5212, 294.8848, 295.5955, 295.9421]
            }
          }
        }
      };

      // Run Test
      encTempService.runSimulation(inputValue).subscribe(
        data => expect(data).toEqual(expectedOutputValue, 'should return the simulation result'),
        fail
      );

      // Mock Server
      const requestURL = 'http://localhost:8080/ntt/airtightenctemp';
      const req = httpTestingController.expectOne(requestURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(inputValue);
      const expectedResponse = new HttpResponse({
        status: 201, statusText: 'Created', body: expectedOutputValue
      });
      req.event(expectedResponse);
    });

  });
});
