import PropTypes from 'prop-types';
import { Table } from 'antd';
import { Compra } from '../../models/compra.model';

export function ComprasTable({ dataSource }) {
  return <Table columns={Compra.columns} dataSource={dataSource} />;
}

ComprasTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape(Compra.propTypes)),
};