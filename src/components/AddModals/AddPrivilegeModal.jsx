import { Modal, Form, Input, message } from 'antd';
import { addPrivilege } from '../../services/privileges.service';

export default function AddPrivilegeModal({ onClose, isOpen }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          messageApi.open({
            type: 'loading',
            content: 'Guardando privilegio...',
            duration: 0,
          });
          await addPrivilege(values);
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
        console.error('Error al guardar el privilegio:', errorInfo);
        messageApi.destroy();
        messageApi.open({
          type: 'error',
          content: 'Algo salió mal, por favor intente de nuevo',
        });
      });
  };

  return (
    <Modal
      title="Nuevo Privilegio"
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
      </Form>
    </Modal>
  );
}