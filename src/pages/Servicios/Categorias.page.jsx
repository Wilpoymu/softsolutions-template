import { useState } from 'react';
import { Button } from 'antd';
import { CategoriesTable } from '../../components/Tables';
import { getCategories } from '../../services/categories.service';
import { AddCategoryModal } from '../../components/AddModals';

const CategoriasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getCategories();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Lista de Categorías</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Categoría
        </Button>
      </div>
      <CategoriesTable dataSource={dataSource} />
      <AddCategoryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default CategoriasPage;