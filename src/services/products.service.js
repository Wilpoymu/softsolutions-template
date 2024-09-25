import Product from '../models/product.model';

export function getProducts() {
  return localStorage.getItem('products')
    ? JSON.parse(localStorage.getItem('products'))
    : [];
}

export function addProduct(product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newProduct = new Product(product);
      try {
        newProduct.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar el nuevo cliente en localStorage
      const existingProducts = getProducts();
      existingProducts.push(newProduct);
      localStorage.setItem('products', JSON.stringify(existingProducts));
      resolve(newProduct);
    }, 2000);
  });
}

export function editProduct(updatedProduct) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingProducts = getProducts();
      const productIndex = existingProducts.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (productIndex === -1) {
        return reject(new Error('Producto no encontrado'));
      }
      existingProducts[productIndex] = updatedProduct;
      localStorage.setItem('products', JSON.stringify(existingProducts));
      resolve(updatedProduct);
    }, 2000);
  });
}

export function deleteProduct(productId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingProducts = getProducts();
      const updatedProducts = existingProducts.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      resolve();
    }, 2000);
  });
}
