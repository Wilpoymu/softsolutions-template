import Parent from './parent.model';

class Products extends Parent {
  constructor({ id, name, description, price, categoryId, categoryName }) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
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
        dataIndex: 'categoryName',
        key: 'categoryName',
      },
    ];
  }

  setCategoryName(categories) {
    const category = categories.find((cat) => cat.id === this.categoryId);
    if (category) {
      this.categoryName = category.name;
    }
  }

  validate() {
    if (!this.name) {
      throw new Error('Por favor ingrese el nombre del producto');
    }
    if (!this.price) {
      throw new Error('Por favor ingrese el precio del producto');
    }
    if (!this.description) {
      throw new Error('Por favor ingrese la descripción del producto');
    }
    if (!this.categoryId) {
      throw new Error('Por favor ingrese la categoría del producto');
    }
  }
}

export default Products;
