import PropTypes from 'prop-types';
import { Table, Input, Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Proveedor from '../../models/proveedor.model';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

export function ProveedoresTable({ dataSource, onEdit, onDelete }) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(dataSource);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredData(dataSource);
  }, [dataSource]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    if (dates) {
      const [start, end] = dates;
      const filtered = dataSource.filter(item => {
        const date = new Date(item.date); // Adjust according to your date field
        return date >= start && date <= end;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(dataSource);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Proveedores');
    XLSX.writeFile(workbook, 'Proveedores.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pdfColumns = Proveedor.columns.map(col => ({ header: col.title, dataKey: col.dataIndex }));
    const data = filteredData.map(row => {
      const rowData = {};
      pdfColumns.forEach(col => {
        rowData[col.dataKey] = row[col.dataKey];
      });
      return rowData;
    });
    doc.autoTable(pdfColumns, data);
    doc.save('Proveedores.pdf');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    sorter: (a, b) => (a[dataIndex] > b[dataIndex] ? 1 : -1),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // setTimeout(() => this.searchInput.select());
      }
    },
  });

  const columns = [
    ...Proveedor.columns.map(col => ({
      ...col,
      ...getColumnSearchProps(col.dataIndex),
    })),
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <>
          <Button onClick={() => onEdit(record)}>Editar</Button>
          <Button onClick={() => onDelete(record)} danger>Eliminar</Button>
          <Button onClick={() => navigate(`/compras/proveedores/${record.id}`)}>Ver Detalles</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <RangePicker onChange={handleDateRangeChange} style={{ marginBottom: 16 }} />
      <Button onClick={exportToExcel} style={{ marginRight: 8 }}>Export to Excel</Button>
      <Button onClick={exportToPDF} style={{ marginRight: 8 }}>Export to PDF</Button>
      <Table id="table" columns={columns} dataSource={filteredData} />
    </>
  );
}

ProveedoresTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
