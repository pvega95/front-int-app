export class TypeDocument {
  documents: object = {
      1: {
          name: 'DNI',
          length: 8,
          type: 'number'
      },
      2: {
          name: 'Carnet de extranjería',
          length: 12,
          type: 'text'
      },
      3: {
          name: 'Pasaporte',
          length: 12,
          type: 'text'
      },
      4: {
          name: 'RUC',
          length: 11,
          type: 'number'
      }
  };
  constructor(){}
}
