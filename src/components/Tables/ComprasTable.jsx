import PropTypes from 'prop-types';
import { Table, Empty, Input, Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Compra } from '../../models/compra.model';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const { RangePicker } = DatePicker;

export function ComprasTable({ dataSource }) {
  const [columns, setColumns] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(dataSource);

  useEffect(() => {
    setFilteredData(dataSource);
  }, [dataSource]);

  useEffect(() => {
    const fetchColumns = async () => {
      const cols = await Compra.getColumns();
      setColumns(cols.map(col => ({
        ...col,
        ...getColumnSearchProps(col.dataIndex),
      })));
    };
    fetchColumns();
  }, []);

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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Compras');
    XLSX.writeFile(workbook, 'Compras.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pdfColumns = columns.map(col => ({ header: col.title, dataKey: col.dataIndex }));
    const data = filteredData.map(row => {
      const rowData = {};
      pdfColumns.forEach(col => {
        rowData[col.dataKey] = row[col.dataKey];
      });
      return rowData;
    });
    doc.autoTable(pdfColumns, data);
    doc.save('Compras.pdf');
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

  return (
    <>
      <RangePicker onChange={handleDateRangeChange} style={{ marginBottom: 16 }} />
      <Button onClick={exportToExcel} style={{ marginRight: 8 }}>Export to Excel</Button>
      <Button onClick={exportToPDF} style={{ marginRight: 8 }}>Export to PDF</Button>
      {dataSource && dataSource.length > 0 ? (
        <Table id="table" columns={columns} dataSource={filteredData} />
      ) : (
        <Empty description="No hay datos disponibles" />
      )}
    </>
  );
}

ComprasTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};