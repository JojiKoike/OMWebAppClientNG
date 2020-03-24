export class NTTEncTempOutputModel {
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
  constructor (
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
    public modelicaUnit1_convTop_fluid_T?: number[],
    public modelicaUnit1_convTop_solid_T?: number[],
    public modelicaUnit1_convBottom_fluid_T?: number[],
    public modelicaUnit1_convBottom_solid_T?: number[],
    public modelicaUnit1_convSide1_fluid_T?: number[],
    public modelicaUnit1_convSide1_solid_T?: number[],
    public modelicaUnit1_convSide2_fluid_T?: number[],
    public modelicaUnit1_convSide2_solid_T?: number[],
    public modelicaUnit1_convSide3_fluid_T?: number[],
    public modelicaUnit1_convSide3_solid_T?: number[],
    public modelicaUnit1_convSide4_fluid_T?: number[],
    public modelicaUnit1_convSide4_solid_T?: number[],
    public modelicaUnit1_convTop_Q_flow?: number[],
    public modelicaUnit1_RadTop_Q_flow?: number[],
    public modelicaUnit1_convBottom_Q_flow?: number[],
    public modelicaUnit1_RadBottom_Q_flow?: number[],
    public modelicaUnit1_convSide1_Q_flow?: number[],
    public modelicaUnit1_RadSide1_Q_flow?: number[],
    public modelicaUnit1_convSide2_Q_flow?: number[],
    public modelicaUnit1_RadSide2_Q_flow?: number[],
    public modelicaUnit1_convSide3_Q_flow?: number[],
    public modelicaUnit1_RadSide3_Q_flow?: number[],
    public modelicaUnit1_convSide4_Q_flow?: number[],
    public modelicaUnit1_RadSide4_Q_flow?: number[],
    public modelicaEnc_convTopIn_fluid_T?: number[],
    public modelicaEnc_convTopIn_solid_T?: number[],
    public modelicaEnc_convTopOut_fluid_T?: number[],
    public modelicaEnc_convTopOut_solid_T?: number[],
    public modelicaEnc_convBottomIn_fluid_T?: number[],
    public modelicaEnc_convBottomOut_solid_T?: number[],
    public modelicaEnc_convSideIn1_fluid_T?: number[],
    public modelicaEnc_convSideOut1_solid_T?: number[],
    public modelicaEnc_convSideIn2_fluid_T?: number[],
    public modelicaEnc_convSideOut2_solid_T?: number[],
    public modelicaEnc_convSideIn3_fluid_T?: number[],
    public modelicaEnc_convSideOut3_solid_T?: number[],
    public modelicaEnc_convSideIn4_fluid_T?: number[],
    public modelicaEnc_convSideOut4_solid_T?: number[],
    public modelicaEnc_convTopOut_Q_flow?: number[],
    public modelicaEnc_RadTopOut_Q_flow?: number[],
    public modelicaEnc_convBottomOut_Q_flow?: number[],
    public modelicaEnc_RadBottomOut_Q_flow?: number[],
    public modelicaEnc_convSideOut1_Q_flow?: number[],
    public modelicaEnc_RadSideOut1_Q_flow?: number[],
    public modelicaEnc_convSideOut2_Q_flow?: number[],
    public modelicaEnc_RadSideOut2_Q_flow?: number[],
    public modelicaEnc_convSideOut3_Q_flow?: number[],
    public modelicaEnc_RadSideOut3_Q_flow?: number[],
    public modelicaEnc_convSideOut4_Q_flow?: number[],
    public modelicaEnc_RadSideOut4_Q_flow?: number[],
  ) {}
}
