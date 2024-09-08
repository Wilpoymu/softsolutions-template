import PropTypes from 'prop-types';

import { Table } from 'antd';
import Cliente from '../../models/cliente.model';

export function ClientsTable({ dataSource }) {
  return <Table columns={Cliente.columns} dataSource={dataSource} />;
}

ClientsTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};
