import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ProductsTable } from '../../components/Tables';
import { AddProductModal } from '../../components/AddModals';
import { getProducts } from '../../services/products.service';
import { getCategories } from '../Servicios/Categorias.page';
import Products from '../../models/product.model';

const ProductosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  const handleData = (data) => {
    const products = data.map((product) => {
      const productInstance = new Products(product);
      productInstance.setCategoryName(categories);
      return {
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
      <ProductsTable dataSource={dataSource} />
      <AddProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ProductosPage;
