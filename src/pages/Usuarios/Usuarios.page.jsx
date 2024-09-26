import { useState } from 'react';
import { Button } from 'antd';
import { UsersTable } from '../../components/Tables';
import { getUsers } from '../../services/users.service';
import { AddUserModal } from '../../components/AddModals';

const UsuariosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getUsers();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Lista de Usuarios</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Usuario
        </Button>
      </div>
      <UsersTable dataSource={dataSource} />
      <AddUserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default UsuariosPage;