import { useState } from 'react';
import { Button } from 'antd';
import { ProveedoresTable } from '../../components/Tables/ProveedoresTable';
import { getProveedores } from '../../services/proveedores.service';
import AddProveedorModal from '../../components/AddModals/AddProveedorModal';

const ProveedoresPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getProveedores();
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
