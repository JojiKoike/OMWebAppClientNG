export class InitUIValuesModel {
  constructor (
    public ui_set_value?: UISetValue
  ) {}
}
export class UISetValue {
  constructor (
    public head?: UISetValueHead,
    public body?: UISetValueBody
  ) {}
}

export class UISetValueHead {
  constructor (
    public index?: number,
    public simulation_model_name?: string,
    public status?: string,
    public version?: string,
    public data_length?: number
  ) {}
}

export class UISetValueBody {
  constructor (
    public default_values?: DefaultValuesModel,
    public select_options?: SelectOptionsModel,
    public solution_options?: SolutionOptionsModel
  ) {}
}

export class DefaultValuesModel {
  constructor (
    public simulation_options?: SimulationOptionsModel,
    public parameters?: SimulationParametersModel,
  ) {}
}

export class SimulationOptionsModel {
  constructor (
    public startTime?: number,
    public stopTime?: number,
    public stepSize?: number,
    public tolerance?: number,
    public solver?: string
  ) {}
}


export class SimulationParametersModel {
  constructor (
    public c?: number,
    public k?: number,
    public m?: number,
    public v0?: number,
  ) {}
}


export class SelectOptionsModel {
  constructor (
    public tolerance?: {[key: string]: number},
    public solver?: {[key: string]: string}
  ) {}
}

export class SolutionOptionsModel {
  constructor (
    public available_solutions?: string[]
  ) {}
}
