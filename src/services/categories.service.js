import Category from '../models/category.model';
import axiosConfig from '../utils/axiosConfig.js';

export async function getCategories() {
  try {
    const response = await axiosConfig.get('/Category');
    return response.data.$values || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export function addCategory(category) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newCategory = new Category(category);
      try {
        newCategory.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar la nueva categoría en localStorage
      const existingCategories = getCategories();
      existingCategories.push(newCategory);
      localStorage.setItem('categories', JSON.stringify(existingCategories));
      resolve(newCategory);
    }, 2000);
  });
}
