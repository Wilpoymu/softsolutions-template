import Parent from './parent.model';

class Permiso extends Parent {
  constructor({ name, description, privileges }) {
    super();
    this.name = name;
    this.description = description;
    this.privileges = privileges;
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
      {
        title: 'Privilegios',
        dataIndex: 'privileges',
        key: 'privileges',
        render: (privileges) => privileges.join(', '),
      },
    ];
  }

  validate() {
    if (!this.name) {
      throw new Error('Por favor ingrese el nombre del permiso');
    }
    if (!this.description) {
      throw new Error('Por favor ingrese la descripción del permiso');
    }
    if (!this.privileges || this.privileges.length === 0) {
      throw new Error('Por favor seleccione al menos un privilegio');
    }
  }
}

export default Permiso;