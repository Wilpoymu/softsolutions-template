import { Modal, Form, Input, InputNumber, message } from 'antd';
import { useEffect } from 'react';
import { addProduct, editProduct } from '../../services/products.service';

export default function AddProductModal({ onClose, isOpen, productToEdit }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // Establecer valores del formulario si se está editando un producto
  useEffect(() => {
    if (productToEdit) {
      form.setFieldsValue(productToEdit);
    } else {
      form.resetFields();
    }
  }, [productToEdit, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          messageApi.open({
            type: 'loading',
            content: productToEdit ? 'Actualizando producto...' : 'Guardando producto...',
            duration: 0,
          });

          if (productToEdit) {
            // Editar producto existente
            await editProduct({ ...productToEdit, ...values });
            messageApi.destroy();
            messageApi.open({
              type: 'success',
              content: `${values.name} actualizado correctamente`,
            });
          } else {
            // Agregar nuevo producto
            await addProduct(values);
            messageApi.destroy();
            messageApi.open({
              type: 'success',
              content: `${values.name} guardado correctamente`,
            });
          }

          onClose(); // Cerrar el modal después de guardar o editar
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
      title={productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
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
          name="category"
          label="Categoría"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese la categoría',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
