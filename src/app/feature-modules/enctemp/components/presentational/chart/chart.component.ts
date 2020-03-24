import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { SimulationOutputHead, ChartOptions, Results } from '../../../core/models';
import { MultiLineChart } from '../../../core/logics';
import { OutputCategory } from '../../../core/constants';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @ViewChild('chart_t') svgElement_T: ElementRef;
  @ViewChild('chart_h') svgElement_H: ElementRef;
  @Input() output_head: SimulationOutputHead;
  @Input() output_body_result: Results;
  @Input() line_options: ChartOptions;
  private chart_t: MultiLineChart;
  private chart_h: MultiLineChart;

  constructor() {
  }

  ngOnInit() {
   this.chart_t = new MultiLineChart(
      this.svgElement_T.nativeElement, this.line_options, this.output_head,
      this.output_body_result, OutputCategory.TEMP
    );
    this.chart_h = new MultiLineChart(
      this.svgElement_H.nativeElement, this.line_options, this.output_head,
      this.output_body_result, OutputCategory.HEAT_FLOW
    );
  }

  ngOnChanges() {
   if (this.chart_t) {
      this.chart_t.update(this.line_options,
        this.output_head, this.output_body_result, OutputCategory.TEMP);
    }
    if (this.chart_h) {
      this.chart_h.update(this.line_options,
        this.output_head, this.output_body_result, OutputCategory.HEAT_FLOW);
    }
  }
}
