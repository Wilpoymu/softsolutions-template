import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Spin } from 'antd';
import { getCompraById } from '../../services/compras.service.js';

const CompraDetailsPage = () => {
  const { id } = useParams();
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompra = async () => {
      const data = await getCompraById(id);
      setCompra(data);
      setLoading(false);
    };
    fetchCompra();
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  if (!compra) {
    return <p>No se encontraron detalles para esta compra.</p>;
  }

  return (
    <Descriptions title="Detalles de la Compra" bordered>
      <Descriptions.Item label="Proveedor">{compra.proveedorId}</Descriptions.Item>
      <Descriptions.Item label="Total">{`$ ${compra.total.toLocaleString()}`}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Inicio">{compra.fechaInicio}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Pago">{compra.fechaPago}</Descriptions.Item>
      <Descriptions.Item label="Pagado">{compra.pagado ? 'Sí' : 'No'}</Descriptions.Item>
      <Descriptions.Item label="Entregado">{compra.entregado ? 'Sí' : 'No'}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Creación">{compra.fechaCreacion}</Descriptions.Item>
      <Descriptions.Item label="Productos">
        {compra.productos.map(producto => (
          <div key={producto.id}>
            <p><strong>{producto.name}</strong></p>
            <p>{producto.description}</p>
            <p>{`Precio: $ ${producto.price.toLocaleString()}`}</p>
          </div>
        ))}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CompraDetailsPage;