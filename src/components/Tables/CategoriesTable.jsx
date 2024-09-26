import PropTypes from 'prop-types';
import { Table } from 'antd';
import Category from '../../models/category.model';

export function CategoriesTable({ dataSource }) {
  return <Table columns={Category.columns} dataSource={dataSource} />;
}

CategoriesTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};
