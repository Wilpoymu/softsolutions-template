import { useState } from 'react';
import { Button } from 'antd';
import { PermisosTable } from '../../components/Tables';
import { getPermisos } from '../../services/permisos.service';
import { AddPermisoModal } from '../../components/AddModals';

const PermisosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getPermisos();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Lista de Permisos</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Permiso
        </Button>
      </div>
      <PermisosTable dataSource={dataSource} />
      <AddPermisoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PermisosPage;
