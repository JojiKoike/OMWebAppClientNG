import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import {
  LoadDefaultInput,
  RunSimulation,
  ResetSimulationResult
} from '../../../store/actions';
import * as fromNTTEncTemp from '../../../store/reducers';
import {
  SimulationParametersModel,
  SimulationOptionsModel,
  SelectOptionsModel,
  NTTEncTempInputModel,
  SimulationParameters,
  SimulationOptions,
  SimulationInputBody,
  SimulationInputHead,
  SimulationInput,
  ResultsOptions
} from '../../../core/models';

import * as fromUnitConverter from '../../../core/logics/unit-converter';
import * as fromInputValidator from '../../../../../shared/validators/forbidden-input-value';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  public inputFormGroup: FormGroup; // Root FormGroup of Input

  loading$: Observable<boolean>;
  default_params$: Observable<SimulationParametersModel>;
  default_options$: Observable<SimulationOptionsModel>;
  select_options$: Observable<SelectOptionsModel>;

  constructor(
    private store: Store<fromNTTEncTemp.State>,
    private formBuilder: FormBuilder
  ) {
    // Subscription Settings
    this.loading$ = this.store.pipe(select(fromNTTEncTemp.getLoading));
    this.default_params$ = this.store.pipe(select(fromNTTEncTemp.getDefaultParams));
    this.default_options$ = this.store.pipe(select(fromNTTEncTemp.getDefaultOptions));
    this.select_options$ = this.store.pipe(select(fromNTTEncTemp.getSelectOptions));

    // Init Form Group
    this.inputFormGroup = this.formBuilder.group({
      params: this.formBuilder.group({
        outer: this.formBuilder.group({
          t_fixed: ['', [Validators.required,
            fromInputValidator.ValidateInputTemperatureGEZeroKelvin
            ]]
        }),
        unit: this.formBuilder.group({
          t_st: ['', [Validators.required,
            fromInputValidator.ValidateInputTemperatureGEZeroKelvin
            ]],
          height: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          width: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          depth: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          cp: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          e: ['', [Validators.required,
            fromInputValidator.ValidateInputRatio
          ]],
          power: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]]
        }),
        enc: this.formBuilder.group({
          t_st: ['', [Validators.required,
            fromInputValidator.ValidateInputTemperatureGEZeroKelvin
            ]],
          height: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          width: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          depth: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          thickness: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          ro: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          cp: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          ke: ['', [Validators.required,
            fromInputValidator.ValidateInputOverZero
          ]],
          e_in: ['', [Validators.required,
            fromInputValidator.ValidateInputRatio
          ]],
          e_out: ['', [Validators.required,
            fromInputValidator.ValidateInputRatio
          ]]
        })
      }, { validator: [fromInputValidator.ValidateEncLargerUnit]}),
      options: this.formBuilder.group({
        start_time: ['', [Validators.required, Validators.min(0)]],
        stop_time: ['', [Validators.required, fromInputValidator.ValidateInputOverZero]],
        step_size: ['', [Validators.required, fromInputValidator.ValidateInputOverZero]],
        tolerance: ['', Validators.required],
        solver: ['', Validators.required]
      }, { validator: [fromInputValidator.ValidateStopTimeAfterStartTime,
        fromInputValidator.ValidateNumOfPlotsPerLine
      ]})
    });
  }

  /**
   * Initialize
   */
  ngOnInit() {
    this.store.dispatch(new LoadDefaultInput());
    this.setDefaultInputs();
 }


  /**
   * Reset Inputs
   */
  resetInputs() {
    this.store.dispatch(new ResetSimulationResult());
    this.setDefaultInputs();
  }

  /**
   * Run Simulation
   */
  runSimulation() {
    const params = this.inputFormGroup.get('params');
    const params_unit = params.get('unit');
    const params_enc = params.get('enc');
    const params_outer = params.get('outer');
    const simulationParameters = new SimulationParameters(
      fromUnitConverter.celsius2kelvin(params_outer.get('t_fixed').value),
      fromUnitConverter.celsius2kelvin(params_enc.get('t_st').value),
      fromUnitConverter.celsius2kelvin(params_unit.get('t_st').value),
      params_enc.get('cp').value,
      params_unit.get('cp').value,
      fromUnitConverter.millimeter2meter(params_enc.get('depth').value),
      fromUnitConverter.millimeter2meter(params_unit.get('depth').value),
      params_unit.get('e').value,
      params_enc.get('e_in').value,
      params_enc.get('e_out').value,
      fromUnitConverter.millimeter2meter(params_enc.get('height').value),
      fromUnitConverter.millimeter2meter(params_unit.get('height').value),
      params_enc.get('ke').value,
      params_unit.get('power').value,
      params_enc.get('ro').value,
      fromUnitConverter.millimeter2meter(params_enc.get('thickness').value),
      fromUnitConverter.millimeter2meter(params_enc.get('width').value),
      fromUnitConverter.millimeter2meter(params_unit.get('width').value)
    );
    const options = this.inputFormGroup.get('options');
    const simulationOptions = new SimulationOptions(
      options.get('start_time').value,
      options.get('stop_time').value,
      options.get('step_size').value,
      options.get('tolerance').value,
      options.get('solver').value
    );
    const resultOptions = new ResultsOptions([
      'time',
      'modelicaUnit1.convTop.fluid.T',
      'modelicaUnit1.convTop.solid.T',
      'modelicaUnit1.convTop.Q_flow',
      'modelicaUnit1.RadTop.Q_flow',
      'modelicaEnc.convTopIn.fluid.T',
      'modelicaEnc.convTopIn.solid.T',
      'modelicaEnc.convTopOut.fluid.T',
      'modelicaEnc.convTopOut.solid.T',
      'modelicaEnc.convTopOut.Q_flow',
      'modelicaEnc.RadTopOut.Q_flow',
    ]);
    const simulationInputBody
      = new SimulationInputBody(simulationOptions, simulationParameters, resultOptions);
    const simulationInputHead
      = new SimulationInputHead(0, 'NTT.modelica_ENC_Unit_Test', '1.0.0');
    const simulationInput = new SimulationInput(simulationInputHead, simulationInputBody);
    const nttEncTempInputModel = new NTTEncTempInputModel(simulationInput);
    this.store.dispatch(new RunSimulation({input: nttEncTempInputModel}));
  }

   /**
   * Set Inputs Default Value
   */
  private setDefaultInputs() {
    const params = this.inputFormGroup.get('params');
    const params_unit = params.get('unit');
    const params_enc = params.get('enc');
    const params_outer = params.get('outer');
    this.default_params$.subscribe(res => {
      params_outer.get('t_fixed').setValue(fromUnitConverter.kelvin2celsius(res.T_fixed));
      params_enc.get('t_st').setValue(fromUnitConverter.kelvin2celsius(res.T_st_enc));
      params_unit.get('t_st').setValue(fromUnitConverter.kelvin2celsius(res.T_st_unit));
      params_enc.get('cp').setValue(res.cp_enc);
      params_unit.get('cp').setValue(res.cp_unit);
      params_enc.get('depth').setValue(fromUnitConverter.meter2millimeter(res.depth_enc));
      params_unit.get('depth').setValue(fromUnitConverter.meter2millimeter(res.depth_unit));
      params_unit.get('e').setValue(res.e_unit);
      params_enc.get('e_in').setValue(res.ein_enc);
      params_enc.get('e_out').setValue(res.eout_enc);
      params_enc.get('height').setValue(fromUnitConverter.meter2millimeter(res.height_enc));
      params_unit.get('height').setValue(fromUnitConverter.meter2millimeter(res.height_unit));
      params_enc.get('ke').setValue(res.ke_enc);
      params_unit.get('power').setValue(res.power_unit);
      params_enc.get('ro').setValue(res.ro_enc);
      params_enc.get('thickness').setValue(fromUnitConverter.meter2millimeter(res.thickness_enc));
      params_enc.get('width').setValue(fromUnitConverter.meter2millimeter(res.width_enc));
      params_unit.get('width').setValue(fromUnitConverter.meter2millimeter(res.width_unit));
    });
    const options = this.inputFormGroup.get('options');
    this.default_options$.subscribe(res => {
      options.get('start_time').setValue(res.startTime);
      options.get('stop_time').setValue(res.stopTime);
      options.get('step_size').setValue(res.stepSize);
      options.get('tolerance').setValue(res.tolerance);
      options.get('solver').setValue(res.solver);
    });
  }
}
