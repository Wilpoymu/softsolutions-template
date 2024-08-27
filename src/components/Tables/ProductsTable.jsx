import PropTypes from "prop-types";
import { Table } from "antd";
import Product from "../../models/product.model";

export function ProductsTable({ dataSource }) {
  return <Table columns={Product.columns} dataSource={dataSource} />;
}

ProductsTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};