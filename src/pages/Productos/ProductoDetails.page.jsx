
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Spin } from 'antd';
import { getProductById } from '../../services/products.service';

const ProductoDetailsPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      const data = await getProductById(id);
      setProducto(data);
      setLoading(false);
    };
    fetchProducto();
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  if (!producto) {
    return <p>No se encontraron detalles para este producto.</p>;
  }

  return (
    <Descriptions title="Detalles del Producto" bordered>
      <Descriptions.Item label="Nombre">{producto.name}</Descriptions.Item>
      <Descriptions.Item label="Descripción">{producto.description}</Descriptions.Item>
      <Descriptions.Item label="Precio">{`$ ${producto.price.toLocaleString()}`}</Descriptions.Item>
      <Descriptions.Item label="Categoría">{producto.category}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Creación">{producto.creationDate}</Descriptions.Item>
    </Descriptions>
  );
};

export default ProductoDetailsPage;