
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Spin } from 'antd';
import { getCategoryById } from '../../services/categories.service';

const CategoriaDetailsPage = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoria = async () => {
      const data = await getCategoryById(id);
      setCategoria(data);
      setLoading(false);
    };
    fetchCategoria();
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  if (!categoria) {
    return <p>No se encontraron detalles para esta categoría.</p>;
  }

  return (
    <Descriptions title="Detalles de la Categoría" bordered>
      <Descriptions.Item label="Nombre">{categoria.name}</Descriptions.Item>
      <Descriptions.Item label="Descripción">{categoria.description}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Creación">{categoria.creationDate}</Descriptions.Item>
    </Descriptions>
  );
};

export default CategoriaDetailsPage;