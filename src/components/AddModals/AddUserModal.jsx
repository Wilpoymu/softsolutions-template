import { Modal, Form, Input, InputNumber, message, Select, Switch } from 'antd';
import { addUser } from '../../services/users.service';

export default function AddUserModal({ onClose, isOpen }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          messageApi.open({
            type: 'loading',
            content: 'Guardando usuario...',
            duration: 0,
          });
          await addUser(values);
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
        console.error('Error al guardar el usuario:', errorInfo);
        messageApi.destroy();
        messageApi.open({
          type: 'error',
          content: 'Algo salió mal, por favor intente de nuevo',
        });
      });
  };

  return (
    <Modal
      title="Nuevo Usuario"
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
          name="organization"
          label="Organización"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese la organización',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Por favor ingrese un correo electrónico válido',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Teléfono"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el teléfono',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese la contraseña',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="status"
          label="Estado"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: 'Por favor seleccione el estado',
            },
          ]}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="city_id"
          label="ID de Ciudad"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el ID de la ciudad',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="role_id"
          label="ID de Rol"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el ID del rol',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
}