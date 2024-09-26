import { useState } from 'react';
import { Button } from 'antd';
import { ComprasTable } from '../../components/Tables';
import { getCompras } from '../../services/compras.service.js';
import ComprasForm from '../../components/ComprasForm';

const ComprasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getCompras();
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
          <Button
            type="primary"
            onClick={() => setModalOpen(true)}
            style={{ marginBottom: '2em' }}
          >
            Agregar Compra
          </Button>
        </div>
      )}
      {modalOpen && <ComprasForm onClose={() => setModalOpen(false)} />}
      {!modalOpen && <ComprasTable dataSource={dataSource} />}
    </div>
  );
};

export default ComprasPage;