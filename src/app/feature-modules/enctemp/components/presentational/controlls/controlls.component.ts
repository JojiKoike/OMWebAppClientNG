import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-controlls',
  templateUrl: './controlls.component.html',
  styleUrls: ['./controlls.component.scss']
})
export class ControllsComponent {

  @Input() input_form_group: FormGroup;
  @Input() loading: boolean;
  @Output() simulation_started = new EventEmitter<any>();
  @Output() reset_inputs = new EventEmitter<any>();

  constructor() { }

  runSimulation() {
    this.simulation_started.emit();
  }

  resetInputs() {
    this.reset_inputs.emit();
  }

}
