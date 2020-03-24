import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meter2millimeter'
})
export class Meter2MillimeterPipe implements PipeTransform {

  transform(meter: number): number {
    return meter * 1000.0;
  }

}
