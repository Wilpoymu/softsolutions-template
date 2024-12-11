import { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ProductsTable } from '../../components/Tables';
import { AddProductModal } from '../../components/AddModals';
import { getProducts, deleteProduct } from '../../services/products.service';
import { getCategories } from '../Servicios/Categorias.page';
import Products from '../../models/product.model';

const ProductosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  const handleData = (data) => {
    const products = data.map((product) => {
      const productInstance = new Products(product);
      productInstance.setCategoryName(categories);
      return {
        id: productInstance.id, // Add this line
        name: productInstance.name,
        description: productInstance.description,
        price: productInstance.price,
        categoryName: productInstance.categoryName,
      };
    });
    setDataSource(products);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response && Array.isArray(response.$values)) {
          setProducts(response.$values);
        } else {
          console.error('Expected an array but got:', response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching products:', error);
        }
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response && Array.isArray(response)) {
          setCategories(response);
        } else {
          console.error('Expected an array but got:', response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching categories:', error);
        }
      }
    };

    fetchProducts();
    fetchCategories();
  }, [navigate]);

  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      handleData(products);
    }
  }, [products, categories]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete.id);
      setDataSource(dataSource.filter(p => p.id !== productToDelete.id));
      setDeleteModalVisible(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
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
        <h2>Lista de Productos</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Producto
        </Button>
      </div>
      <ProductsTable dataSource={dataSource} onEdit={handleEdit} onDelete={handleDelete} />
      <AddProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialData={editingProduct} />
      <Modal
        title="Confirmar eliminación"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>¿Está seguro de que desea eliminar este producto?</p>
      </Modal>
    </div>
  );
};

export default ProductosPage;
