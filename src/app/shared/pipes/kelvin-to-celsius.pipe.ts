import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvin2celsius'
})
export class Kelvin2CelsiusPipe implements PipeTransform {


  transform(kelvin: number): number {
    return kelvin - 273.15;
  }

}
