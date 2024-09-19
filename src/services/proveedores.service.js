import Proveedor from '../models/proveedor.model';

export function getProveedores() {
  return localStorage.getItem('proveedores')  // Cambiado a 'proveedores'
    ? JSON.parse(localStorage.getItem('proveedores'))  // Cambiado a 'proveedores'
    : [];
}

export function addProveedor(proveedor) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newProveedor = new Proveedor(proveedor);
      try {
        newProveedor.validate();
      } catch (error) {
        return reject(error);  // Retorna inmediatamente si hay un error
      }
      
      // Guardar el nuevo proveedor en localStorage
      const existingProveedores = getProveedores();
      
      existingProveedores.push(newProveedor);
      localStorage.setItem('proveedores', JSON.stringify(existingProveedores));  // Cambiado a 'proveedores'
      
      resolve(newProveedor);
    }, 2000);
  });
}
