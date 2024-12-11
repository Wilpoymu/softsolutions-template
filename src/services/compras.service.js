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

export function editCompra(id, compra) {
  return axiosInstance.put(`/Buys/${id}`, compra)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function deleteCompra(id) {
  return axiosInstance.delete(`/Buys/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export async function getCompraById(id) {
  try {
    const response = await axiosInstance.get(`/Buys/${id}`);
    if (response.data) {
      return {
        ...response.data,
        productos: response.data.productos.$values,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching compra details:', error);
    return null;
  }
}
