import { Pipe, PipeTransform } from '@angular/core';
import { DefaultKeyValueDiffer } from '@angular/core/src/change_detection/differs/default_keyvalue_differ';

@Pipe({
  name: 'float_format'
})
export class FloatFormatPipe implements PipeTransform {

  transform(value: number, order: number): string {
    return value.toFixed(order);
  }

}
