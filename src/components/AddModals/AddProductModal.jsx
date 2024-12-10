import { Modal, Form, Input, InputNumber, message, Select } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createProduct } from '../../services/products.service';
import { getCategories } from '../../pages/Servicios/Categorias.page';

export default function AddProductModal({ onClose, isOpen }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getCategories();
        const categoriesArray = categoriesData.$values || categoriesData;
        setCategories(Array.isArray(categoriesArray) ? categoriesArray : []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          messageApi.open({
            type: 'loading',
            content: 'Guardando producto...',
            duration: 0,
          });
          await createProduct(values);
          messageApi.destroy();
          messageApi.open({
            type: 'success',
            content: `${values.name} guardado correctamente`,
          });
          onClose(); // Cerrar el modal después de guardar
          form.resetFields(); // Resetear el formulario
        } catch (error) {
          messageApi.destroy();
          messageApi.open({
            type: 'error',
            content: error.message,
          });
        }
      })
      .catch((errorInfo) => {
        console.error('Error al guardar el producto:', errorInfo);
        messageApi.destroy();
        messageApi.open({
          type: 'error',
          content: 'Algo salió mal, por favor intente de nuevo',
        });
      });
  };

  return (
    <Modal
      title="Nuevo Producto"
      onCancel={onClose}
      onClose={onClose}
      onOk={handleOk}
      open={isOpen}
      okText="Guardar"
    >
      {contextHolder}
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el nombre',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Precio"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el precio',
            },
          ]}
        >
          <InputNumber
            controls={false}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese la descripción',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Categoría"
          rules={[
            {
              required: true,
              message: 'Por favor seleccione la categoría',
            },
          ]}
        >
          <Select loading={categories.length === 0}>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

AddProductModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};