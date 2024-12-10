import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { CategoriesTable } from '../../components/Tables';
import { getCategories } from '../../services/categories.service';
import { AddCategoryModal } from '../../components/AddModals';

const CategoriasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      if (Array.isArray(categories)) {
        setDataSource(categories);
      } else {
        setDataSource([]);
      }
    };
    fetchCategories();
  }, []);

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
      <AddCategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export { getCategories };

export default CategoriasPage;
