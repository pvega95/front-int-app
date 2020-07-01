import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documento'
})
export class DocumentoPipe implements PipeTransform {
  transform(value: any): any {
    let documento: string;
    switch (value) {
      case '1':
        documento = 'CARGO'
        break;
      case '2':
        documento = 'RESPUESTA'
        break;
      default:
        break;
    }
    return documento

  }

}
