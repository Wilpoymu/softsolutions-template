import Parent from './parent.model';

class Category extends Parent {
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
      throw new Error('Por favor ingrese el nombre de la categoría');
    }
    if (!this.description) {
      throw new Error('Por favor ingrese la descripción de la categoría');
    }
  }
}

export default Category;
