import { Compra } from '../models/compra.model.jsx';

export function getCompras() {
  return localStorage.getItem('compras')
    ? JSON.parse(localStorage.getItem('compras'))
    : [];
}

export function addCompra(compra) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Adding compra', compra);
      const newCompra = new Compra(compra);
      console.log('New compra', newCompra);
      try {
        newCompra.validate();
      } catch (error) {
        reject(error);
      }
      const existingCompras = getCompras();
      existingCompras.push(newCompra);
      localStorage.setItem('compras', JSON.stringify(existingCompras));
      resolve(newCompra);
    }, 2000);
  });
}