import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';
import moment from 'moment';

export function EventsTable({ dataSource }) {
  const columns = [
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Fecha de Inicio',
      dataIndex: 'fechaInicio',
      key: 'fechaInicio',
      render: (text) => (text ? moment(text).format('DD/MM/YYYY HH:mm') : ''),
    },
    {
      title: 'Fecha de Fin',
      dataIndex: 'fechaFin',
      key: 'fechaFin',
      render: (text) => (text ? moment(text).format('DD/MM/YYYY HH:mm') : ''),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
}

EventsTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};
