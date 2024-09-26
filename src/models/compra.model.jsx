import moment from 'moment';
import { Tag } from 'antd';
import { getProveedores } from '../services/proveedores.service';
import Parent from './parent.model';

export class Compra extends Parent {
  constructor({
    proveedor,
    productos,
    total,
    fechaInicio,
    fechaPago,
    pagado,
    entregado,
  }) {
    super();
    this.proveedor = proveedor;
    this.productos = productos;
    this.total = total;
    this.fechaInicio = fechaInicio;
    this.fechaPago = fechaPago;
    this.pagado = pagado;
    this.entregado = entregado;
  }

  static get columns() {
    const proveedores = getProveedores();
    return [
      {
        title: 'Proveedor',
        dataIndex: 'proveedor',
        key: 'proveedor',
        render: (proveedorId) => {
          const proveedor = proveedores.find((p) => p.id === proveedorId);
          if (!proveedor) {
            console.error(`Proveedor con id ${proveedorId} no encontrado`);
            return 'Desconocido';
          }
          return proveedor.name;
        },
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text) => `$ ${text.toLocaleString()}`,
      },
      {
        title: 'Fecha de Inicio',
        dataIndex: 'fechaInicio',
        key: 'fechaInicio',
        render: (text) => (text ? moment(text).format('DD/MM/YYYY') : ''),
      },
      {
        title: 'Fecha de Pago',
        dataIndex: 'fechaPago',
        key: 'fechaPago',
        render: (text) => (text ? moment(text).format('DD/MM/YYYY') : ''),
      },
      {
        title: 'Fecha de Creación',
        dataIndex: 'fechaCreacion',
        key: 'fechaCreacion',
        render: (text) => (text ? moment(text).format('DD/MM/YYYY') : ''),
      },
      {
        title: 'Pagado',
        dataIndex: 'pagado',
        key: 'pagado',
        render: (paid) =>
          paid ? <Tag color="green">Sí</Tag> : <Tag color="red">No</Tag>,
      },
      {
        title: 'Entregado',
        dataIndex: 'entregado',
        key: 'entregado',
        render: (delivered) =>
          delivered ? <Tag color="green">Sí</Tag> : <Tag color="red">No</Tag>,
      },
    ];
  }

  validate() {
    if (!this.proveedor) {
      throw new Error('El proveedor es requerido');
    }
    if (!this.productos) {
      throw new Error('Los productos son requeridos');
    }
    if (!this.total) {
      throw new Error('El total es requerido');
    }
  }
}