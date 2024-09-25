import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import Product from '../../models/product.model';

export function ProductsTable({ dataSource, onEdit, onDelete }) {
  // Definimos las columnas incluyendo las acciones
  const columns = [
    ...Product.columns, // Incluimos las columnas predefinidas en el modelo
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => onEdit(record)} type="link">Editar</Button>
          <Button onClick={() => onDelete(record.id)} type="link" danger>Eliminar</Button>
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
}

ProductsTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
