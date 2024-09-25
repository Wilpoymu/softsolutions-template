import { useState } from 'react';
import { Button } from 'antd';
import { ProductsTable } from '../../components/Tables';
import { getProducts, editProduct, deleteProduct } from '../../services/products.service';
import AddProductModal from '../../components/AddModals/AddProductModal';

const ProductosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState(getProducts());
  const [productToEdit, setProductToEdit] = useState(null);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setModalOpen(false);
  };

  const handleEditProduct = (updatedProduct) => {
    editProduct(updatedProduct).then(() => {
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setModalOpen(false);
    }).catch(error => {
      console.error('Error al editar el producto:', error);
    });
  };
  

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId).then(() => {
      setProducts(products.filter((product) => product.id !== productId));
    });
  };

  const handleOpenModal = (product = null) => {
    setProductToEdit(product);
    setModalOpen(true);
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
        <Button type="primary" onClick={() => handleOpenModal()}>
          Agregar Producto
        </Button>
      </div>
      <ProductsTable 
        dataSource={products} 
        onEdit={(product) => handleOpenModal(product)} 
        onDelete={handleDeleteProduct} 
      />
      <AddProductModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        productToEdit={productToEdit} 
        onSave={productToEdit ? handleEditProduct : handleAddProduct} 
      />
    </div>
  );
};

export default ProductosPage;
