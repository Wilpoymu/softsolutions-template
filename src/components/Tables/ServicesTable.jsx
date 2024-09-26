import PropTypes from 'prop-types';
import { Table } from 'antd';
import Service from '../../models/service.model.jsx';

export function ServicesTable({ dataSource }) {
  return <Table columns={Service.columns} dataSource={dataSource} />;
}

ServicesTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};