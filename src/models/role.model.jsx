import Parent from './parent.model';

class Role extends Parent {
  constructor({ name, description, permisos }) {
    super();
    this.name = name;
    this.description = description;
    this.permisos = permisos;
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
        title: 'Permisos',
        dataIndex: 'permisos',
        key: 'permisos',
        render: (permisos) => permisos.join(', '),
      },
    ];
  }

  validate() {
    if (!this.name) {
      throw new Error('Por favor ingrese el nombre del rol');
    }
    if (!this.description) {
      throw new Error('Por favor ingrese la descripción del rol');
    }
    if (!this.permisos || this.permisos.length === 0) {
      throw new Error('Por favor seleccione al menos un permiso');
    }
  }
}

export default Role;