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

export async function getCategoryById(id) {
  try {
    const response = await axiosConfig.get(`/Category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category details:', error);
    return null;
  }
}

export async function updateCategory(id, category) {
  try {
    const response = await axiosConfig.put(`/Category/${id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const response = await axiosConfig.delete(`/Category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}