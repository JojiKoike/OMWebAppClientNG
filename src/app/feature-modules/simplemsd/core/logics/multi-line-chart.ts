import { select, Selection, scaleLinear, ScaleLinear, scaleOrdinal,
  schemeCategory10, min, max, Line, line, BaseType,
  bisector, axisBottom, axisLeft, color } from 'd3';
import { interpolatePath } from 'd3-interpolate-path';
import { ChartOptions } from '../models/chart-options';
import { SimulationOutputHead, Results,
  TimeSeriesChartData, TimeSeriesChartPoint } from '../models';
import { defaultOptions } from '../constants';

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
      left: margin[3] || margin[1],
    };
  }


  constructor(svgElement: any, options: ChartOptions,
    output_head: SimulationOutputHead, output_body_result: Results) {
    this.init(svgElement);
    this.update(options, output_head, output_body_result);
  }

  private init(svgElement: any): void {
    this.svgElement = svgElement;
    this.svg = select(svgElement);

    // append element g.charts-container
    this.svg
      .append('g')
      .attr('class', 'charts-container');
  }

  update(chartOptions: ChartOptions, output_head: SimulationOutputHead, results: Results) {
    // Build multiData
    this.multiData = [];
    const xtData = [];
    const vtData = [];
    for (let i = 0; i < output_head.data_length; i++) {
      xtData.push({
        t: results.time[i],
        y: results.x[i]
      });
      vtData.push({
        t: results.time[i],
        y: results.v[i]
      });
    }
    this.multiData.push(xtData);
    this.multiData.push(vtData);

    // Update Options Settings
    const options = this.options = Object.assign({}, defaultOptions, chartOptions);

    // Update SVG Area Dimension
    this.svg
      .attr('width', options.width)
      .attr('height', options.height);

    // Compute margin, chartWidth, chartHeight
    const margin = this.getMargin(options.margin);
    const width = this.svgElement.getBoundingClientRect().width;
    const height = this.svgElement.getBoundingClientRect().height;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;


    // select g.chart-container, update position
    const chartsContainer = this.svg.select('g.charts-container')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Legend
    const legendValues = ['Displacement', 'Velocity'];
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
      .style('fill', function(d, i) { return legendColor[i]; } );

    legend.append('text')
      .attr('x', 40)
      .attr('y', 10)
      .text((d, i) =>  d)
      .attr('class', 'textselected')
      .style('text-anchor', 'start')
      .style('font-size', 10);

    // Update Elements
    let charts = chartsContainer
      .selectAll('path.chart')
      .data(this.multiData);

    // Compute xScale, yScale from multiData and chart size
    const xScale = this.xScale = getLinearScale(this.multiData, 't', chartWidth);
    const yScale = this.yScale = getLinearScale(this.multiData, 'y', chartHeight);

    // Show Axis
    const axisX = axisBottom(xScale);
    const axisY = axisLeft(yScale);

    let xAxis = chartsContainer.append('g');
    let yAxis = chartsContainer.append('g');

    if (!isNaN(yScale(0))) {
      xAxis.exit().remove();
      yAxis.exit().remove();
      xAxis = chartsContainer.append('g').call(axisX)
                .attr('transform', 'translate(' + 0 + ',' + yScale(0) + ')');
      yAxis = chartsContainer.append('g').call(axisY);
    }

    // generate initial bottom line, ready for first time transition or before remove
    const initChartGenerator = this.initChartGeneratorFactory(xScale, chartHeight);
    const firstData = this.multiData[0];

    charts.exit()
      .transition()
      .duration(options.animateDuration)
      .attr('stroke', '#fefefe')
      .attrTween('d', function (d: any) {
        const previous = select(this).attr('d');
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

  // generate bottom line
  private initChartGeneratorFactory(
    xScale: ScaleLinear<number, number>, chartHeight: number): Line<TimeSeriesChartPoint> {
    const chartLine = line<TimeSeriesChartPoint>()
      .x((d) => xScale(d.t))
      .y(chartHeight);
    return chartLine;
  }


  // generate chart
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
