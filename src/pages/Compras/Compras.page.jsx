import { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { ComprasTable } from '../../components/Tables';
import { getCompras, deleteCompra } from '../../services/compras.service.js';
import ComprasForm from '../../components/ComprasForm';

const ComprasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editingCompra, setEditingCompra] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [compraToDelete, setCompraToDelete] = useState(null);

  useEffect(() => {
    const fetchCompras = async () => {
      const compras = await getCompras();
      setDataSource(compras);
    };
    fetchCompras();
  }, []);

  const handleEdit = (compra) => {
    setEditingCompra(compra);
    setModalOpen(true);
  };

  const handleDelete = (compra) => {
    setCompraToDelete(compra);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCompra(compraToDelete.id);
      setDataSource(dataSource.filter(c => c.id !== compraToDelete.id));
      setDeleteModalVisible(false);
      setCompraToDelete(null);
    } catch (error) {
      console.error('Error deleting compra:', error);
    }
  };

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
      {modalOpen && (
        <ComprasForm
          onClose={() => {
            setModalOpen(false);
            setEditingCompra(null);
          }}
          initialData={editingCompra}
        />
      )}
      {!modalOpen && (
        <ComprasTable
          dataSource={dataSource}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <Modal
        title="Confirmar eliminación"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>¿Está seguro de que desea eliminar esta compra?</p>
      </Modal>
    </div>
  );
};

export default ComprasPage;
