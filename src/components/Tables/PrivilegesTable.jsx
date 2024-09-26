import PropTypes from 'prop-types';
import { Table } from 'antd';
import Privilege from '../../models/privilege.model';

export function PrivilegesTable({ dataSource }) {
  return <Table columns={Privilege.columns} dataSource={dataSource} />;
}

PrivilegesTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};
