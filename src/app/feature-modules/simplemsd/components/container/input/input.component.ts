import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  LoadDefaultInput,
  RunSimulation
} from '../../../store/actions';
import * as fromSimpleMSD from '../../../store/reducers';
import {
  SimulationParametersModel,
  SimulationOptionsModel,
  SelectOptionsModel,
  SimpleMSDInputModel,
  SimulationParameters,
  SimulationOptions,
  SimulationInputBody,
  SimulationInputHead,
  SimulationInput } from '../../../core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResultsOptions } from '../../../core/models/simplemsd.input.model';


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
    private store: Store<fromSimpleMSD.State>,
    private formBuilder: FormBuilder
    ) {
    // Subscription Settings
    this.loading$ = this.store.pipe(select(fromSimpleMSD.getLoading));
    this.default_params$ = this.store.pipe(select(fromSimpleMSD.getDefaultParams));
    this.default_options$ = this.store.pipe(select(fromSimpleMSD.getDefaultOptions));
    this.select_options$ = this.store.pipe(select(fromSimpleMSD.getSelectOptions));

    // Init Form Group
    this.inputFormGroup = this.formBuilder.group({
      params: this.formBuilder.group({
        mass: ['', Validators.required],
        spring_constant: ['', Validators.required],
        damping_coefficient: ['', Validators.required],
        initial_velocity: ['', Validators.required]
      }),
      options: this.formBuilder.group({
        start_time: ['', Validators.required],
        stop_time: ['', Validators.required],
        step_size: ['', Validators.required]
      })
    });
   }

  /**
   * Initialize
   */
  ngOnInit() {
    this.store.dispatch(new LoadDefaultInput());
  }

  /**
   * Reset Values
   */
  resetInputs() {
    this.store.dispatch(new LoadDefaultInput());
  }

  /**
   * Run Simulation
   */
  runSimulation() {
    const params = this.inputFormGroup.get('params');
    const simulationParameters = new SimulationParameters(
      params.get('mass').value,
      params.get('spring_constant').value,
      params.get('damping_coefficient').value,
      params.get('initial_velocity').value
    );
    const options = this.inputFormGroup.get('options');
    const simulationOptions = new SimulationOptions(
      options.get('start_time').value,
      options.get('stop_time').value,
      options.get('step_size').value,
      1e-6,
      'dassl'
    );
    const resultsOptions = new ResultsOptions(['time', 'v', 'x']);
    const simulationInputBody
      = new SimulationInputBody(simulationOptions, simulationParameters, resultsOptions);
    const simulationInputHead
      = new SimulationInputHead(0, 'SimpleMSD', '1.0.0');
    const simulationInput = new SimulationInput(simulationInputHead, simulationInputBody);
    const simpleMSDInputModel = new SimpleMSDInputModel(simulationInput);
    this.store.dispatch(new RunSimulation({input: simpleMSDInputModel}));
  }

}
