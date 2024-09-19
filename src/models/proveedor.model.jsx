import Parent from './parent.model';

class Proveedor extends Parent {
  constructor({ name, email, phone, address }) {
    super();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }

  static get columns() {
    return [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Correo Electronico',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Telefono',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Direccion',
        dataIndex: 'address',
        key: 'address',
      },
    ];
  }

  validate() {
    if (!this.name) {
      throw new Error('Por favor ingrese el nombre del proveedor');
    }
    if (!this.email) {
      throw new Error('Por favor ingrese el correo electronico del proveedor');
    }
    if (!this.phone) {
      throw new Error('Por favor ingrese el numero de telefono del proveedor');
    }
    if (!this.address) {
      throw new Error('Por favor ingrese la dirección del proveedor');
    }
  }
}

export default Proveedor;
