import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Category from '../../models/category.model';

export function CategoriesTable({ dataSource, onEdit, onDelete }) {
  const navigate = useNavigate();

  const columns = [
    ...Category.columns,
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <>
          <Button onClick={() => onEdit(record)}>Editar</Button>
          <Button onClick={() => onDelete(record)} danger>Eliminar</Button>
          <Button onClick={() => navigate(`/categories/${record.id}`)}>Ver Detalles</Button>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
}

CategoriesTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
