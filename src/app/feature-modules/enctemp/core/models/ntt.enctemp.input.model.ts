export class NTTEncTempInputModel {
  constructor(
    public simulation_input?: SimulationInput
  ) {}
}

export class SimulationInput {
  constructor (
    public head: SimulationInputHead,
    public body: SimulationInputBody
  ) {}
}

export class SimulationInputHead {
  constructor (
    public index: number,
    public simulation_model_name: string,
    public version: string
  ) {}
}

export class SimulationInputBody {
  constructor (
    public simulation_options: SimulationOptions,
    public parameters: SimulationParameters,
    public results_options: ResultsOptions,
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
    public T_fixed: number,
    public T_st_enc: number,
    public T_st_unit: number,
    public cp_enc: number,
    public cp_unit: number,
    public depth_enc: number,
    public depth_unit: number,
    public e_unit: number,
    public ein_enc: number,
    public eout_enc: number,
    public height_enc: number,
    public height_unit: number,
    public ke_enc: number,
    public power_unit: number,
    public ro_enc: number,
    public thickness_enc: number,
    public width_enc: number,
    public width_unit: number
  ) {}
}


export class ResultsOptions {
  constructor(
    public target_results: string[]
  ) {}
}
