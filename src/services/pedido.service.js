import { Pedido } from '../models/pedido.model';

export function getPedidos() {
  return localStorage.getItem('pedidos')
    ? JSON.parse(localStorage.getItem('pedidos'))
    : [];
}

export function addPedido(pedido) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Adding pedido', pedido);
      const newPedido = new Pedido(pedido);
      console.log('New Pedido', newPedido);
      try {
        newPedido.validate();
      } catch (error) {
        reject(error);
      }
      const existingPedidos = getPedidos();
      existingPedidos.push(newPedido);
      localStorage.setItem('pedidos', JSON.stringify(existingPedidos));
      resolve(newPedido);
    }, 2000);
  });
}
