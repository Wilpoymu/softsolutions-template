import { Modal, Form, Input, message, Select } from 'antd';
import { addRole } from '../../services/roles.service';
import { getPermisos } from '../../services/permisos.service';

export default function AddRoleModal({ onClose, isOpen }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const permisos = getPermisos();

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          messageApi.open({
            type: 'loading',
            content: 'Guardando rol...',
            duration: 0,
          });
          await addRole(values);
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
        console.error('Error al guardar el rol:', errorInfo);
        messageApi.destroy();
        messageApi.open({
          type: 'error',
          content: 'Algo salió mal, por favor intente de nuevo',
        });
      });
  };

  return (
    <Modal
      title="Nuevo Rol"
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
          name="permisos"
          label="Permisos"
          rules={[
            {
              required: true,
              message: 'Por favor seleccione al menos un permiso',
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Seleccione los permisos"
            options={permisos.map((permiso) => ({
              label: permiso.name,
              value: permiso.name,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}