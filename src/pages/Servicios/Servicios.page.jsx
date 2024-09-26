import { useState } from 'react';
import { Button } from 'antd';
import { ServicesTable } from '../../components/Tables';
import { getServices } from '../../services/services.service';
import { AddServiceModal } from '../../components/AddModals';

const ServiciosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getServices();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Lista de Servicios</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Servicio
        </Button>
      </div>
      <ServicesTable dataSource={dataSource} />
      <AddServiceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ServiciosPage;
