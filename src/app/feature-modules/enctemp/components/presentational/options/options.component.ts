import { Component, Input } from '@angular/core';
import { SimulationOptionsModel, SelectOptionsModel } from '../../../core/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {

  @Input() default_options: SimulationOptionsModel;
  @Input() select_options: SelectOptionsModel;
  @Input() input_form_group: FormGroup;

  constructor() {}

}
