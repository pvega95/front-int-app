import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'analista'
})
export class AnalistaPipe implements PipeTransform {
  transform(value: any): any {
    let analista: string;
    switch (value) {
      case 1:
        analista = 'ALIS LAGUNA'
        break;
      case 2:
        analista = 'MARLENE YUPANQUI'
        break;
      case 3:
        analista = 'CARLOS PALOMINO'
        break;
      case 4:
        analista = 'YOLANDA CISNEROS'
        break;
      case 5:
        analista = 'LUIS REINA'
        break;
      case 6:
        analista = 'GERALDINE LARA'
        break;
      default:
        break;
    }
    return analista

  }

}
