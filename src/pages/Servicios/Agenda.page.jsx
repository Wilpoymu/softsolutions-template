import { useState } from 'react';
import { Button } from 'antd';
import { obtenerEventos } from '../../services/agenda.service';
import AddEventModal from '../../components/AddEventModal';
import { EventsTable } from '../../components/Tables/EventsTable.jsx';

const AgendaPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = obtenerEventos();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Agenda</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Evento
        </Button>
      </div>
      <EventsTable dataSource={dataSource} />
      <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AgendaPage;
