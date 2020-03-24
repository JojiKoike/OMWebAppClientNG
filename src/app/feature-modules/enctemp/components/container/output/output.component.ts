import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromNTTEncTemp from '../../../store/reducers';
import { ChartOptions, Results, SimulationOutputHead } from '../../../core/models';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent {
  loading$: Observable<boolean>;
  output_head$: Observable<SimulationOutputHead>;
  output_body_result$: Observable<Results>;
  chart_options$: Observable<ChartOptions>;

  constructor(private store: Store<fromNTTEncTemp.State>) {
    this.loading$ = this.store.pipe(select(fromNTTEncTemp.getLoading));
    this.output_head$ = this.store.pipe(select(fromNTTEncTemp.getOutputHead));
    this.output_body_result$ = this.store.pipe(select(fromNTTEncTemp.getOutputBodyResults));
    this.chart_options$ = this.store.pipe(select(fromNTTEncTemp.getChartOptions));
  }

}
