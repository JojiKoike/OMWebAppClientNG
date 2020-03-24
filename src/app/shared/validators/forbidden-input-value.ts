import { AbstractControl, FormGroup } from '@angular/forms';

const MAX_INTERVALS_PER_LINE = 500;     // 1ライン当たりの最大区間数
const CELSIUS_TO_KELVIN = 273.15;   // ℃⇒Kに変換する際に加える定数

export function ValidateInputOverZero(control: AbstractControl) {
  if (control.value == null) {
    return null;
  }
  return control.value <= 0 ?
  {'validateInputOverZeroError': true} : null;
}

export function ValidateInputRatio(control: AbstractControl) {
  return (control.value < 0 || control.value > 1) ?
  {'validateInputRatioError': true} : null;
}

export function ValidateInputTemperatureGEZeroKelvin(control: AbstractControl) {
  if (control.value == null) {
    return null;
  }
  return control.value + CELSIUS_TO_KELVIN < 0 ?
  {'validateInputTemperatureGEZeroKelvinError': true} : null;
}

export function ValidateStopTimeAfterStartTime(control: FormGroup) {
  const start_time = control.get('start_time').value;
  const stop_time = control.get('stop_time').value;
  if (start_time < 0 || start_time == null || stop_time <= 0 || stop_time == null) {
    return null;
  }
  return stop_time <= start_time ?
  {'validateStopTimeAfterStartTimeError': true} : null;
}

export function ValidateNumOfPlotsPerLine(control: FormGroup) {
  const start_time = control.get('start_time').value;
  const stop_time = control.get('stop_time').value;
  const step_size = control.get('step_size').value;
  if (step_size <= 0 || step_size == null || start_time < 0 || start_time == null) {
    return null;
  }
  return (stop_time - start_time) / step_size > MAX_INTERVALS_PER_LINE ?
  {'validateNumOfPlotsPerLineError': true} : null;
}

export function ValidateEncLargerUnit(control: FormGroup) {
  const unit_height = control.get('unit').get('height').value;
  const enc_height = control.get('enc').get('height').value;
  const unit_width = control.get('unit').get('width').value;
  const enc_width = control.get('enc').get('width').value;
  const unit_depth = control.get('unit').get('depth').value;
  const enc_depth = control.get('enc').get('depth').value;
  let res = null;
  if (unit_height <= 0 || unit_height == null || enc_height <= 0 || enc_height == null
    || unit_width <= 0 || unit_width == null || enc_width <= 0 || enc_width == null
    || unit_depth <= 0 || unit_depth == null || enc_depth <= 0 || enc_depth == null) {
    return null;
  }
  if (unit_height >= enc_height) {
    res = {'validateEncLargerUnitHeightError': true};
  } else if (unit_width >= enc_width) {
    res = {'validateEncLargerUnitWidthError': true};
  } else if (unit_depth >= enc_depth) {
    res = {'validateEncLargerUnitDepthError': true};
  }
  return res;
}
