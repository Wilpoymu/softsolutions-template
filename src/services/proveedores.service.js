import Proveedor from '../models/proveedor.model';
import axiosConfig from '../utils/axiosConfig.js';

export async function getProveedores() {
  // return axiosConfig.get('/Provider')
  //   .then(response => response.data)
  //   .catch(error => {
  //     throw error;
  //   });
  try {
    const response = await axiosConfig.get('/Provider');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
}

export function addProveedor(proveedor) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newProveedor = new Proveedor(proveedor);
      try {
        newProveedor.validate();
      } catch (error) {
        return reject(error); // Retorna inmediatamente si hay un error
      }

      // Guardar el nuevo proveedor en localStorage
      const existingProveedores = getProveedores();

      existingProveedores.push(newProveedor);
      localStorage.setItem('proveedores', JSON.stringify(existingProveedores)); // Cambiado a 'proveedores'

      resolve(newProveedor);
    }, 2000);
  });
}


export async function getProveedorById(id) {
  try {
    const response = await axiosConfig.get(`/Provider/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching provider by ID:', error);
    throw error;
  }
}

export async function deleteProveedor(id) {
  try {
    await axiosConfig.delete(`/Provider/${id}`);
  } catch (error) {
    console.error('Error deleting provider:', error);
    throw error;
  }
}

export async function updateProveedor(id, proveedor) {
  try {
    await axiosConfig.put(`/Provider/${id}`, proveedor);
  } catch (error) {
    console.error('Error updating provider:', error);
    throw error;
  }
}