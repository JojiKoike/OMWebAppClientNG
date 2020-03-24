import { select, Selection, scaleLinear,
  ScaleLinear, scaleOrdinal, schemeCategory10, min, max, Line, line, BaseType,
  bisector, axisBottom, axisLeft, color, svg } from 'd3';
import { interpolatePath } from 'd3-interpolate-path';
import { ChartOptions } from '../models/chart-options';
import { SimulationOutputHead, Results,
  TimeSeriesChartData, TimeSeriesChartPoint } from '../models';
import { defaultOptions, OutputCategory } from '../constants';
import * as fromUnitConverter from './unit-converter';

export class MultiLineChart {

  // ----- Field Definition ----- //
  // svg native element
  private svgElement: any;
  // svg d3 selection
  private svg: Selection<any, {}, null, undefined>;
  // options
  private options: ChartOptions;
  // data
  private multiData: TimeSeriesChartData[];
  // x scale
  private xScale: ScaleLinear<number, number>;
  // y scale
  private yScale: ScaleLinear<number, number>;
  // d3 color
  private d3Color = scaleOrdinal(schemeCategory10);

  // compute margin
  private getMargin(originMargin: number | number[]) {
    originMargin = originMargin || 0;
    const margin = typeof originMargin === 'number' ? [originMargin, originMargin, originMargin, originMargin] : originMargin;
    return {
      top: margin[0],
      right: margin[1],
      bottom: margin[2] || margin[0],
      left: margin[3] || margin[1]
    };
  }

  constructor(svgElement: any, options: ChartOptions,
    output_head: SimulationOutputHead, output_body_result: Results,
    output_category: OutputCategory) {
      this.init(svgElement);
      this.update(options, output_head, output_body_result, output_category);
  }

  private init(svgElement: any): void {
    this.svgElement = svgElement;
    this.svg = select(svgElement);

    // append element g.charts-container
    this.svg
      .append('g')
      .attr('class', 'charts-container');
  }

  update(chartOptions: ChartOptions, output_head: SimulationOutputHead,
    results: Results, output_category: OutputCategory) {
      // Build multiData
      this.multiData = [];
      // Enclosure Temperature
      const encConvTopOutSolidTData = [];
      const encConvTopInFluidTData = [];
      const encConvTopInSolidTData = [];
      // Enclosure Heat Flow
      const encRadTopOutQFlowData = [];
      const encConvTopOutQFlowData = [];
      // Unit Temperature
      const unitConvSolidTData = [];
      // Unit Heat Flow
      const unitConvTopQFlowData = [];
      const unitRadTopQFlowData = [];

      switch (output_category) {
        case OutputCategory.TEMP:
          for (let i = 0; i < output_head.data_length; i++) {
           encConvTopOutSolidTData.push({
              t: results.time[i],
              y: fromUnitConverter.kelvin2celsius(results.modelicaEnc_convTopOut_solid_T[i])
            });
           encConvTopInSolidTData.push({
              t: results.time[i],
              y: fromUnitConverter.kelvin2celsius(results.modelicaEnc_convTopIn_solid_T[i])
            });
           encConvTopInFluidTData.push({
              t: results.time[i],
              y: fromUnitConverter.kelvin2celsius(results.modelicaEnc_convTopIn_fluid_T[i])
            });
           unitConvSolidTData.push({
              t: results.time[i],
              y: fromUnitConverter.kelvin2celsius(results.modelicaUnit1_convTop_solid_T[i])
            });
          }
          this.multiData.push(encConvTopOutSolidTData);
          this.multiData.push(encConvTopInSolidTData);
          this.multiData.push(encConvTopInFluidTData);
          this.multiData.push(unitConvSolidTData);
          break;
        case OutputCategory.HEAT_FLOW:
          for (let i = 0; i < output_head.data_length; i++) {
            encRadTopOutQFlowData.push({
              t: results.time[i],
              y: results.modelicaEnc_RadTopOut_Q_flow[i]
            });
            encConvTopOutQFlowData.push({
              t: results.time[i],
              y: results.modelicaEnc_convTopOut_Q_flow[i]
            });
            unitRadTopQFlowData.push({
              t: results.time[i],
              y: results.modelicaUnit1_RadTop_Q_flow[i]
            });
            unitConvTopQFlowData.push({
              t: results.time[i],
              y: results.modelicaUnit1_convTop_Q_flow[i]
            });
          }
          this.multiData.push(encRadTopOutQFlowData);
          this.multiData.push(encConvTopOutQFlowData);
          this.multiData.push(unitRadTopQFlowData);
          this.multiData.push(unitConvTopQFlowData);
          break;
     }

      // Update Options Settings
      const options = this.options = Object.assign({}, defaultOptions, chartOptions);

      // Update SVG Area Dimension
      this.svg
        .attr('width', options.width)
        .attr('height', options.height);

      // Calculate margin, chartWidth, chartHeight
      const margin  = this.getMargin(options.margin);
      const width = this.svgElement.getBoundingClientRect().width;
      const height = this.svgElement.getBoundingClientRect().height;
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // select g.chart-container, update position
      const chartsContainer = this.svg.select('g.charts-container')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // Legend
      let legendValues = [];
      switch (output_category) {
        case OutputCategory.TEMP:
          legendValues = ['筐体外側上面温度', '筐体内側上面温度',
          '筐体内空気温度', 'ユニット上面温度'];
          break;
        case OutputCategory.HEAT_FLOW:
          legendValues = ['筐体上面放射熱流量', '筐体上面対流熱流量',
          'ユニット上面放射熱流量', 'ユニット上面対流熱流'];
          break;
      }
      const legendColor = schemeCategory10;
      const legend = chartsContainer
        .selectAll('.legends')
        .data(legendValues)
        .enter()
        .append('g')
        .attr('class', 'legends')
        .attr('transform', function(d, i) {
          return 'translate(0,' + i * 20 + ')';
        });

      legend.append('rect')
        .attr('x', 20).attr('y', 0).attr('width', 10).attr('height', 10)
        .style('fill', function(d, i) { return legendColor[i]; });

      legend.append('text')
        .attr('x', 40)
        .attr('y', 10)
        .text((d, i) => d)
        .attr('class', 'textselected')
        .style('text-anchor', 'start')
        .style('fond-size', 10);

      // Update Elements
      let charts = chartsContainer
        .selectAll('path.chart')
        .data(this.multiData);

      // Compute xScale, yScale from multiData and chart size
      const xScale = this.xScale = getLinearScale(this.multiData, 't', chartWidth);
      const yScale = this.yScale = getLinearScale(this.multiData, 'y', chartHeight);

      // Update Axis
      const axisX = axisBottom(xScale);
      const axisY = axisLeft(yScale);

      const xAxis = chartsContainer.selectAll('.x').data(['dummy']);
      const new_xAxis = xAxis.enter().append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(' + 0 + ',' + chartHeight + ')');
      xAxis.merge(new_xAxis).call(axisX);

      const yAxis = chartsContainer.selectAll('.y').data(['dummy']);
      const new_yAxis = yAxis.enter().append('g')
                    .attr('class', 'y axis');
      yAxis.merge(new_yAxis).call(axisY);

      // Generate Initial Bottom Line, ready for first time transition or before remove
      const initChartGenerator = this.initChartGeneratorFactory(xScale, chartHeight);
      const firstData = this.multiData[0];

      charts.exit()
        .transition()
        .duration(options.animateDuration)
        .attr('stroke', '#fefefe')
        .attrTween('d', function (d: any) {
          const previous = select(this).attr('g');
          const current = initChartGenerator(firstData || d);
          return interpolatePath(previous, current);
        }).remove();

      charts = charts.enter()
        .append('path')
        .attr('class', 'chart')
        .attr('fill', options.fillColor || 'none')
        .attr('stroke', options.strokeColor)
        .attr('d', initChartGenerator)
        .merge(charts as Selection<SVGPathElement, TimeSeriesChartPoint[], BaseType, {}>);

      const chartGenerator = this.chartGeneratorFactory(xScale, yScale);

      charts
        .transition()
        .duration(options.animateDuration)
        .attr('stroke', (d, i) => this.d3Color(i + ''))
        .attrTween('d', function(d) {
          const previous = select(this).attr('d');
          const current = chartGenerator(d);
          return interpolatePath(previous, current);
        });
  }

  // Generate Bottom Line
  private initChartGeneratorFactory(
    xScale: ScaleLinear<number, number>, chartHeight: number): Line<TimeSeriesChartPoint> {
      const chartLine = line<TimeSeriesChartPoint>()
        .x((d) => xScale(d.t))
        .y(chartHeight);
      return chartLine;
  }

  // Generate Chart
  private chartGeneratorFactory(
    xScale: ScaleLinear<number, number>,
    yScale: ScaleLinear<number, number>): Line<TimeSeriesChartPoint> {
      const chartLine = line<TimeSeriesChartPoint>()
        .x((d) => xScale(d.t))
        .y((d) => yScale(d.y));
      return chartLine;
  }
}


function getLinearScale(
  multiData: TimeSeriesChartData[],
  prop: keyof TimeSeriesChartPoint,
  size: number,
  nice?: boolean
): ScaleLinear<number, number> {
  const domain: [number, number] = [
    min(multiData, (data) => min(data, (point) => point[prop])),
    max(multiData, (data) => max(data, (point) => point[prop])),
  ];
  const range = prop === 't' ? [0, size] : [size, 0];
  const scale = scaleLinear()
    .domain(domain)
    .rangeRound(range);
  return nice ? scale.nice() : scale;
}
