import Parent from './parent.model';

class User extends Parent {
  constructor({ id, name, organization, email, phone, password, status, city_id, role_id }) {
    super();
    this.id = id;
    this.name = name;
    this.organization = organization;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.status = status;
    this.city_id = city_id;
    this.role_id = role_id;
  }

  static get columns() {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Organización',
        dataIndex: 'organization',
        key: 'organization',
      },
      {
        title: 'Correo Electrónico',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Teléfono',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (status ? 'Activo' : 'Inactivo'),
      },
      {
        title: 'ID de Ciudad',
        dataIndex: 'city_id',
        key: 'city_id',
      },
      {
        title: 'ID de Rol',
        dataIndex: 'role_id',
        key: 'role_id',
      },
    ];
  }

  validate() {
    if (!this.name) {
      throw new Error('Por favor ingrese el nombre del usuario');
    }
    if (!this.organization) {
      throw new Error('Por favor ingrese la organización del usuario');
    }
    if (!this.email) {
      throw new Error('Por favor ingrese el correo electrónico del usuario');
    }
    if (!this.password) {
      throw new Error('Por favor ingrese la contraseña del usuario');
    }
    if (this.status === undefined) {
      throw new Error('Por favor seleccione el estado del usuario');
    }
    if (!this.city_id) {
      throw new Error('Por favor ingrese el ID de la ciudad del usuario');
    }
    if (!this.role_id) {
      throw new Error('Por favor ingrese el ID del rol del usuario');
    }
  }
}

export default User;