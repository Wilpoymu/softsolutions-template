import { useState } from 'react';
import { Button } from 'antd';
import { RolesTable } from '../../components/Tables';
import { getRoles } from '../../services/roles.service';
import { AddRoleModal } from '../../components/AddModals';

const RolesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getRoles();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Lista de Roles</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Rol
        </Button>
      </div>
      <RolesTable dataSource={dataSource} />
      <AddRoleModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default RolesPage;
