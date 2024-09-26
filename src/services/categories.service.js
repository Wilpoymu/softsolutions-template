import Category from '../models/category.model';

export function getCategories() {
  return localStorage.getItem('categories')
    ? JSON.parse(localStorage.getItem('categories'))
    : [];
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
