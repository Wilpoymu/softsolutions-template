import { useState } from 'react';
import { Button } from 'antd';
import { PedidosTable } from '../../components/Tables/PedidosTable';
import { getPedidos } from '../../services/pedido.service';
import PedidosForm from '../../components/PedidosForm';

const PedidosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getPedidos();
  return (
    <div>
      {!modalOpen && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2>Lista de Pedidos</h2>
          <Button
            type="primary"
            onClick={() => setModalOpen(true)}
            style={{ marginBottom: '2em' }}
          >
            Agregar Pedido
          </Button>
        </div>
      )}
      {modalOpen && <PedidosForm onClose={() => setModalOpen(false)} />}
      {!modalOpen && <PedidosTable dataSource={dataSource} />}
    </div>
  );
};

export default PedidosPage;
