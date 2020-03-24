import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { SimulationOutputHead, ChartOptions, Results } from '../../../core/models';
import { MultiLineChart } from '../../../core/logics';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @ViewChild('chart') svgElement: ElementRef;
  @Input() output_head: SimulationOutputHead;
  @Input() output_body_result: Results;
  @Input() line_options: ChartOptions;
  private chart: MultiLineChart;

  constructor() { }

  ngOnInit() {
    this.chart = new MultiLineChart(
      this.svgElement.nativeElement, this.line_options, this.output_head, this.output_body_result);
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.update(this.line_options, this.output_head, this.output_body_result);
    }
  }

}
