import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSimpleMSD from '../../../store/reducers';
import { ChartOptions, Results, SimulationOutputHead } from '../../../core/models';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  loading$: Observable<boolean>;
  output_head$: Observable<SimulationOutputHead>;
  output_body_result$: Observable<Results>;

  line_options: ChartOptions;

  constructor(private store: Store<fromSimpleMSD.State>) {
    this.loading$ = this.store.pipe(select(fromSimpleMSD.getLoading));
    this.output_head$ = this.store.pipe(select(fromSimpleMSD.getOutputHead));
    this.output_body_result$ = this.store.pipe(select(fromSimpleMSD.getOutputBodyResults));
  }

  ngOnInit() {
    this.line_options = {
      height: 300,
      animateDuration: 1000,
      margin: 10
    };
  }

}
