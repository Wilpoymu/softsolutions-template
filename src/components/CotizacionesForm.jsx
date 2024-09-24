import PropTypes from 'prop-types';

import { useMemo, useState, useEffect } from 'react';
import {
  Form,
  InputNumber,
  message,
  DatePicker,
  Switch,
  Select,
  Button,
  Row,
  Col,
  Divider,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addCotizacion, getCotizaciones } from '../services/cotizacion.service';
import { getClients } from '../services/clients.service';


const { Option } = Select;

export default function CotizacionesForm({ onClose }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const clients = useMemo(() => {
    return getClients();
  }, []);
  const pedidos = useMemo(() => {
    return getCotizaciones();
  }, []);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const cotizaciones = form.getFieldValue('cotizaciones') || [];
    const newTotal = cotizaciones?.reduce((acc, cotizacion) => {
      const cotizacionDetails = cotizaciones.find((p) => p.id === cotizacion?.cotizacion);
      const price = cotizacionDetails ? cotizacionDetails.price : 0;
      return acc + cotizacion?.cantidad * price;
    }, 0);
    setTotal(newTotal);
  };

  useEffect(() => {
    form.setFieldsValue({ total });
  }, [total, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          messageApi.open({
            type: 'loading',
            content: 'Guardando cotizacion...',
            duration: 0,
          });
          await addCotizacion(values);
          messageApi.destroy();
          messageApi.open({
            type: 'success',
            content: 'Nueva cotización guardada correctamente',
          });
          onClose();
          form.resetFields();
        } catch (error) {
          messageApi.destroy();
          messageApi.open({
            type: 'error',
            content: error.message,
          });
        }
      })
      .catch((errorInfo) => {
        console.error('Error al guardar la cotización:', errorInfo);
        messageApi.destroy();
        messageApi.open({
          type: 'error',
          content: 'Algo salió mal, por favor intente de nuevo',
        });
      });
  };

  const handleCotizacionChange = (value, field) => {
    const selectedCotizacion = cotizaciones.find((p) => p.id === value);
    if (selectedCotizacion) {
      form.setFieldsValue({
        cotizaciones: form
          .getFieldValue('cotizaciones')
          .map((item, index) =>
            index === field.name
              ? { ...item, precioUnitario: selectedCotizacion.price }
              : item,
          ),
      });
      calculateTotal();
    }
  };

  const calculateCotizacionTotal = (index) => {
    const cotizaciones = form.getFieldValue('cotizaciones');
    const cantidad = cotizaciones[index].cantidad || 0;
    const precioUnitario = cotizaciones[index].precioUnitario || 0;
    const totalCotizacion = cantidad * precioUnitario;

    const updatedCotizaciones = pedidos.map((item, i) =>
      i === index ? { ...item, totalCotizacion } : item,
    );

    form.setFieldsValue({ cotizaciones: updatedCotizaciones });
  };

  return (
    <div>
      {contextHolder}
      <h1>Nueva Cotización</h1>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ pagado: false, entregado: false }}
        onValuesChange={calculateTotal}
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}
      >
        <Divider orientation="left">Información del Cliente</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Cliente"
              name="cliente"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese el cliente',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Seleccione un cliente"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {clients?.map((client) => (
                  <Option key={client.id} value={client.id}>
                    {client.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Fecha de Inicio"
              name="fechaInicio"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese la fecha de inicio',
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Cotizaciones</Divider>
        <Form.List name="pedidos">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Row gutter={16} key={field.key} align="middle">
                  <Col span={7}>
                    <Form.Item
                      label={index === 0 ? 'Pedido' : ''}
                      name={[field.name, 'pedido']}
                      rules={[
                        {
                          required: true,
                          message: 'Por favor seleccione un producto',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Seleccione un producto"
                        optionFilterProp="children"
                        onChange={(value) => handleCotizacionChange(value, field)}
                      >
                        {products?.map((product) => (
                          <Option key={product.id} value={product.id}>
                            {product.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={5}>
                    <Form.Item
                      label={index === 0 ? 'Cantidad' : ''}
                      name={[field.name, 'cantidad']}
                      rules={[
                        {
                          required: true,
                          message: 'Por favor ingrese la cantidad',
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Cantidad"
                        min={1}
                        onChange={() => {
                          calculateCotizacionTotal(index);
                          calculateTotal();
                        }}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={5}>
                    <Form.Item
                      label={index === 0 ? 'Precio Unitario' : ''}
                      name={[field.name, 'precioUnitario']}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        value={form.getFieldValue([
                          'productos',
                          index,
                          'precioUnitario',
                        ])}
                        readOnly
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={5}>
                    <Form.Item
                      label={index === 0 ? 'Total' : ''}
                      name={[field.name, 'totalProducto']}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        value={form.getFieldValue([
                          'productos',
                          index,
                          'totalProducto',
                        ])}
                        readOnly
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={2}>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        style={{ color: 'red' }}
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    )}
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '100%', marginTop: '16px' }}
                  icon={<PlusOutlined />}
                >
                  Agregar cotización
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col span={12}>
            <Form.Item label="Total" name="total">
              <InputNumber
                readOnly
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                value={total}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Fecha de Pago" name="fechaPago">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Estado de la Cotizacion</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Pagado" name="pagado" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Entregado"
              name="entregado"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" onClick={handleOk} style={{ width: '100%' }}>
            Guardar Cotización
          </Button>
        </Form.Item>

        <Form.Item>
          <Button onClick={onClose} style={{ width: '100%' }}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

CotizacionesForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
