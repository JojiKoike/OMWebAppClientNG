export class SimpleMSDInputModel {
  constructor(
    public simulation_input?: SimulationInput
  ) {}
}

export class SimulationInput {
  constructor(
    public head: SimulationInputHead,
    public body: SimulationInputBody
  ) {}
}

export class SimulationInputHead {
  constructor(
    public index: number,
    public simulation_model_name: string,
    public version: string
  ) {}
}

export class SimulationInputBody {
  constructor(
    public simulation_options: SimulationOptions,
    public parameters: SimulationParameters,
    public results_options: ResultsOptions
  ) {}
}

export class SimulationOptions {
  constructor(
    public startTime: number,
    public stopTime: number,
    public stepSize: number,
    public tolerance: number,
    public solver: string
  ) {}
}

export class SimulationParameters {
  constructor(
    public m: number,
    public k: number,
    public c: number,
    public v0: number
  ) {}
}

export class ResultsOptions {
  constructor(
    public target_results: string[]
  ) {}
}
