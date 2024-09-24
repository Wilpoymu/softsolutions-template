import PropTypes from 'prop-types';

import { Table } from 'antd';
import { Pedido } from '../../models/pedido.model';

export function PedidosTable({ dataSource }) {
  return <Table columns={Pedido.columns} dataSource={dataSource} />;
}

PedidosTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape(Pedido.propTypes)),
};
