import PropTypes from 'prop-types';

import { Table } from 'antd';
import { Cotizacion } from '../../models/cotizacion.model';

export function CotizacionesTable({ dataSource }) {
  return <Table columns={Cotizacion.columns} dataSource={dataSource} />;
}

CotizacionesTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape(Cotizacion.propTypes)),
};
