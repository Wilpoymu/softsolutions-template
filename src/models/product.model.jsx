import Parent from "./parent.model";

class Products extends Parent {
  constructor({name, price, product, category}) {
    super();
    this.name = name;
    this.price = price;
    this.product = product;
    this.category = category;
  }

  static get columns() {
    return [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Precio",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Producto",
        dataIndex: "product",
        key: "product",
      },
      {
        title: "Categoría",
        dataIndex: "category",
        key: "category",
      },
    ];
  }

  validate() {
    if (!this.name) {
      throw new Error("Por favor ingrese el nombre del producto");
    }
    if (!this.price) {
      throw new Error("Por favor ingrese el precio del producto");
    }
    if (!this.product) {
      throw new Error("Por favor ingrese la descripción del producto");
    }
    if (!this.category) {
      throw new Error("Por favor ingrese la categoría del producto");
    }
  }
}

export default Products;
