import Product from '../models/product.model';
import axiosConfig from '../utils/axiosConfig.js';

// export function getProducts() {
//   return localStorage.getItem('products')
//     ? JSON.parse(localStorage.getItem('products'))
//     : [];
// }

export async function getProducts() {
  try {
    const response = await axiosConfig.get('/Product');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createProduct(product) {
  try {
    const response = await axiosConfig.post('/Product', product);
    return response.data;
  } catch (error) {
    console.log('product:', product);
    console.error('Error creating product:', error);
    throw error;
  }
}

export function addProduct(product) {
  return new Promise((resolve, reject) => {
    try {
      const newProduct = new Product(product);
      newProduct.validate();
      const createdProduct = createProduct({
        id: newProduct.id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        categoryId: newProduct.categoryId,
      });
      resolve(createdProduct);
    } catch (error) {
      reject(error);
    }
  });
}
