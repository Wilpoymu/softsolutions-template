import PropTypes from 'prop-types';
import { Table } from 'antd';
import Role from '../../models/role.model';

export function RolesTable({ dataSource }) {
  return <Table columns={Role.columns} dataSource={dataSource} />;
}

RolesTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};
