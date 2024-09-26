import Parent from './parent.model';

class Services extends Parent {
  constructor({ name, price, description, category }) {
    super();
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
  }

  static get columns() {
    return [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Precio',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Descripción',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Categoría',
        dataIndex: 'category',
        key: 'category',
      },
    ];
  }

  validate() {
    if (!this.name) {
      throw new Error('Por favor ingrese el nombre del servicio');
    }
    if (!this.price) {
      throw new Error('Por favor ingrese el precio del servicio');
    }
    if (!this.description) {
      throw new Error('Por favor ingrese la descripción del servicio');
    }
    if (!this.category) {
      throw new Error('Por favor ingrese la categoría del servicio');
    }
  }
}

export default Services;
