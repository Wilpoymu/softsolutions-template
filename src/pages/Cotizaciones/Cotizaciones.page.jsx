import { useState } from 'react';
import { Button } from 'antd';
import { CotizacionesTable } from '../../components/Tables/CotizacionesTable';
import { getCotizaciones } from '../../services/cotizacion.service';
import CotizacionesForm from '../../components/CotizacionesForm';

const CotizacionesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getCotizaciones();
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
            Agregar Cotización
          </Button>
        </div>
      )}
      {modalOpen && <CotizacionesForm onClose={() => setModalOpen(false)} />}
      {!modalOpen && <CotizacionesTable dataSource={dataSource} />}
    </div>
  );
};

export default CotizacionesPage;
