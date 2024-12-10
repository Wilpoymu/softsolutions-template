import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ProveedoresTable } from '../../components/Tables/ProveedoresTable';
import AddProveedorModal from '../../components/AddModals/AddProveedorModal';
import axiosConfig from '../../utils/axiosConfig';

const ProveedoresPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axiosConfig.get('/Provider');
        const data = response.data;
        if (data && Array.isArray(data.$values)) {
          setDataSource(data.$values);
        } else {
          console.error('Fetched data is not in the expected format:', data);
        }
      } catch (error) {
        console.error('Error fetching proveedores:', error);
      }
    };

    fetchProveedores();
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Lista de Proveedores</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Proveedor
        </Button>
      </div>
      <ProveedoresTable dataSource={dataSource} />
      <AddProveedorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ProveedoresPage;
