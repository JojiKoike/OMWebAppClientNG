export class SimpleMSDOutputModel {
  constructor (
    public simulation_output?: SimulationOutput
  ) {}
}

export class SimulationOutput {
  constructor (
    public head?: SimulationOutputHead,
    public body?: SimulationOutputBody
  ) {}
}

export class SimulationOutputHead {
  constructor(
    public index?: number,
    public simulation_model_name?: string,
    public status?: string,
    public version?: string,
    public data_length?: number
  ) {}
}

export class SimulationOutputBody {
  constructor (
    public results?: Results
  ) {}
}

export class Results {
  constructor (
    public time?: number[],
    public x?: number[],
    public v?: number[]
  ) {}
}
