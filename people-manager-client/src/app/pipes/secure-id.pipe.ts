import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secureId',
  standalone: true
})
export class SecureIdPipe implements PipeTransform {
  transform(value: string | number): string {
    const str = String(value ?? '');
    if (str.length <= 3) return str;
    return '*'.repeat(str.length - 3)+ str.substring(0, 3);
  }
}