import Parent from './parent.model';

class Privilege extends Parent {
  constructor({ name, description }) {
    super();
    this.name = name;
    this.description = description;
  }

  static get columns() {
    return [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Descripción',
        dataIndex: 'description',
        key: 'description',
      },
    ];
  }

  validate() {
    if (!this.name) {
      throw new Error('Por favor ingrese el nombre del privilegio');
    }
    if (!this.description) {
      throw new Error('Por favor ingrese la descripción del privilegio');
    }
  }
}

export default Privilege;
