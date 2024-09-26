import PropTypes from 'prop-types';
import { Table } from 'antd';
import Permiso from '../../models/permiso.model';

export function PermisosTable({ dataSource }) {
  return <Table columns={Permiso.columns} dataSource={dataSource} />;
}

PermisosTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};
