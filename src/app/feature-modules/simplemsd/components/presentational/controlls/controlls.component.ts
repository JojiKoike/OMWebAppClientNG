import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-controlls',
  templateUrl: './controlls.component.html',
  styleUrls: ['./controlls.component.scss']
})
export class ControllsComponent {

  @Input() input_form_group: FormGroup;
  @Output() simulation_started = new EventEmitter<any>();
  @Output() reset_inputs_requested = new EventEmitter<any>();

  constructor() { }

  resetInputs() {
    this.reset_inputs_requested.emit();
  }

  runSimulation() {
    this.simulation_started.emit();
  }
}
