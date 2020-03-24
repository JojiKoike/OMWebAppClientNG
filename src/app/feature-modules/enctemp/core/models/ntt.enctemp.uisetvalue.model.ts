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
  constructor(
    public simulation_options?: SimulationOptionsModel,
    public parameters?: SimulationParametersModel
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
    public T_fixed?: number,
    public T_st_enc?: number,
    public T_st_unit?: number,
    public cp_enc?: number,
    public cp_unit?: number,
    public depth_enc?: number,
    public depth_unit?: number,
    public e_unit?: number,
    public ein_enc?: number,
    public eout_enc?: number,
    public height_enc?: number,
    public height_unit?: number,
    public ke_enc?: number,
    public power_unit?: number,
    public ro_enc?: number,
    public thickness_enc?: number,
    public width_enc?: number,
    public width_unit?: number
  ) {}
}


export class SelectOptionsModel {
  constructor (
    public tolerance?: Tolerance[],
    public solver?: Solver[]
  ) {}
}


export class SolutionOptionsModel {
  constructor (
    public available_solutions?: string[]
  ) {}
}

interface Tolerance {
  label: string;
  value: number;
}


interface Solver {
  label: string;
  value: string;
}
