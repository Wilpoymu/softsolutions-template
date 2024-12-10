import { Compra } from '../models/compra.model.jsx';
import axiosInstance from '../utils/axiosConfig';

export async function getCompras() {
  try {
    const response = await axiosInstance.get('/Buys');
    if (response.data && response.data.$values) {
      return response.data.$values.map(compra => ({
        ...compra,
        productos: compra.productos.$values
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching compras:', error);
    return [];
  }
}

export function addCompra(compra) {
  return axiosInstance.post('/Buys', compra)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
