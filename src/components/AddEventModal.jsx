import { Modal, Form, Input, DatePicker, message } from 'antd';
import { crearEvento } from '../services/agenda.service'; 

export default function AddEventModal({ onClose, isOpen }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          messageApi.open({
            type: 'loading',
            content: 'Guardando evento...',
            duration: 0,
          });
          await crearEvento(values);
          messageApi.destroy();
          messageApi.open({
            type: 'success',
            content: `${values.titulo} guardado correctamente`,
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
        console.error('Error al guardar el evento:', errorInfo);
        messageApi.destroy();
        messageApi.open({
          type: 'error',
          content: 'Algo salió mal, por favor intente de nuevo',
        });
      });
  };

  return (
    <Modal
      title="Nuevo Evento"
      onCancel={onClose}
      onClose={onClose}
      onOk={handleOk}
      open={isOpen}
      okText="Guardar"
    >
      {contextHolder}
      <Form form={form} layout="vertical">
        <Form.Item
          name="titulo"
          label="Título"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el título',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descripcion"
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
          name="fechaInicio"
          label="Fecha de Inicio"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese la fecha de inicio',
            },
          ]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="fechaFin"
          label="Fecha de Fin"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese la fecha de fin',
            },
          ]}
        >
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
}