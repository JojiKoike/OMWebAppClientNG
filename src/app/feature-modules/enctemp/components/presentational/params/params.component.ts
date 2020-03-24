import { Component, Input } from '@angular/core';
import { SimulationParametersModel } from '../../../core/models';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent {

  @Input() default_params: SimulationParametersModel;
  @Input() input_form_group: FormGroup;

  constructor() { }

}
