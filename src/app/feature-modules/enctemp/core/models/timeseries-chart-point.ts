export interface TimeSeriesChartPoint {
  // Time (s)
  t: number;

  // Result Value
  y: number;
}

export type TimeSeriesChartData = TimeSeriesChartPoint[];
