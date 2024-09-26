import { useState } from 'react';
import { Button } from 'antd';
import { PrivilegesTable } from '../../components/Tables';
import { getPrivileges } from '../../services/privileges.service';
import { AddPrivilegeModal } from '../../components/AddModals';

const PrivilegiosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getPrivileges();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Lista de Privilegios</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Privilegio
        </Button>
      </div>
      <PrivilegesTable dataSource={dataSource} />
      <AddPrivilegeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default PrivilegiosPage;
