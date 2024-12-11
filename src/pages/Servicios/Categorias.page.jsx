import { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { CategoriesTable } from '../../components/Tables';
import { getCategories, deleteCategory } from '../../services/categories.service';
import { AddCategoryModal } from '../../components/AddModals';

const CategoriasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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

  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(categoryToDelete.id);
      setDataSource(dataSource.filter(c => c.id !== categoryToDelete.id));
      setDeleteModalVisible(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

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
      <CategoriesTable dataSource={dataSource} onEdit={handleEdit} onDelete={handleDelete} />
      <AddCategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingCategory}
      />
      <Modal
        title="Confirmar eliminación"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>¿Está seguro de que desea eliminar esta categoría?</p>
      </Modal>
    </div>
  );
};

export { getCategories };

export default CategoriasPage;
