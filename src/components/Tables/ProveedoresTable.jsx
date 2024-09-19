import PropTypes from 'prop-types';
import { Table } from 'antd';
import Proveedor from '../../models/proveedor.model';

export function ProveedoresTable({ dataSource }) {
  return <Table columns={Proveedor.columns} dataSource={dataSource} />;
}

ProveedoresTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};
