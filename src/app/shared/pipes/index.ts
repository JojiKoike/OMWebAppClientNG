import { Kelvin2CelsiusPipe } from './kelvin-to-celsius.pipe';
import { Meter2MillimeterPipe } from './meter-to-millimeter.pipe';
import { FloatFormatPipe } from './float-format.pipe';

export const SharedPipes = [
  Kelvin2CelsiusPipe,
  Meter2MillimeterPipe,
  FloatFormatPipe
];
