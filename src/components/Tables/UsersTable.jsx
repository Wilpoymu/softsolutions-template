import PropTypes from 'prop-types';
import { Table } from 'antd';
import User from '../../models/user.model';

export function UsersTable({ dataSource }) {
  return <Table columns={User.columns} dataSource={dataSource} />;
}

UsersTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};
