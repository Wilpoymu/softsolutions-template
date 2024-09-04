import PropTypes from "prop-types";

import { Table } from "antd";
import { Venta } from "../../models/venta.model";
  
  export function VentasTable({ dataSource }) {
    return <Table columns={Venta.columns} dataSource={dataSource} />;
  }

VentasTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape(Venta.propTypes)),
};