
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Spin } from 'antd';
import { getProveedorById } from '../../services/proveedores.service';

const ProveedorDetailsPage = () => {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const data = await getProveedorById(id);
        setProveedor(data);
      } catch (error) {
        console.error('Error fetching provider details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProveedor();
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  if (!proveedor) {
    return <p>No se encontraron detalles para este proveedor.</p>;
  }

  return (
    <Descriptions title="Detalles del Proveedor" bordered>
      <Descriptions.Item label="Nombre">{proveedor.name}</Descriptions.Item>
      <Descriptions.Item label="Descripción">{proveedor.description}</Descriptions.Item>
      <Descriptions.Item label="Contacto">{proveedor.contact}</Descriptions.Item>
      <Descriptions.Item label="Dirección">{proveedor.address}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Creación">{proveedor.creationDate}</Descriptions.Item>
    </Descriptions>
  );
};

export default ProveedorDetailsPage;