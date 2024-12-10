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
import { getProducts } from '../services/products.service';
import { getProveedores } from '../services/proveedores.service';
import { addCompra } from '../services/compras.service.js';
import { Navigate } from 'react-router-dom';

const { Option } = Select;

export default function ComprasForm({ onClose }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [proveedores, setProveedores] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await getProveedores();
        if (response && response.$values && Array.isArray(response.$values)) {
          setProveedores(response.$values);
        } else {
          console.error('Expected an array but got:', response);
        }
      } catch (error) {
        console.error('Error fetching proveedores:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response && Array.isArray(response.$values)) {
          setProducts(response.$values);
        } else {
          console.error('Expected an array but got:', response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Navigate('/login');
        } else {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProveedores();
    fetchProducts();
  }, []);

  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const productos = form.getFieldValue('productos') || [];
    const newTotal = productos.reduce((acc, producto) => {
      const productDetails = products.find((p) => p.id === producto.producto);
      const price = productDetails ? productDetails.price : 0;
      return acc + producto.cantidad * price;
    }, 0);
    setTotal(newTotal);
  };

  console.log(products);

  useEffect(() => {
    form.setFieldsValue({ total });
  }, [total, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const compra = {
            proveedorId: values.proveedor,
            productoIds: values.productos.map((producto) => producto.producto), // Extrae solo los IDs
            total: values.total,
            fechaInicio: values.fechaInicio.toISOString(),
            fechaPago: values.fechaPago ? values.fechaPago.toISOString() : null,
            pagado: values.pagado,
            entregado: values.entregado,
          };
  
          messageApi.open({
            type: 'loading',
            content: 'Guardando compra...',
            duration: 0,
          });
          await addCompra(compra);
          messageApi.destroy();
          messageApi.open({
            type: 'success',
            content: 'Nueva compra guardada correctamente',
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
        console.error('Error al guardar la compra:', errorInfo);
        messageApi.destroy();
        messageApi.open({
          type: 'error',
          content: 'Algo salió mal, por favor intente de nuevo',
        });
      });
  };
  

  const handleProductChange = (value, field) => {
    const selectedProduct = products.find((p) => p.id === value);
    if (selectedProduct) {
      form.setFieldsValue({
        productos: form
          .getFieldValue('productos')
          .map((item, index) =>
            index === field.name
              ? { ...item, precioUnitario: selectedProduct.price }
              : item,
          ),
      });
      calculateTotal();
    }
  };

  const calculateProductTotal = (index) => {
    const productos = form.getFieldValue('productos');
    const cantidad = productos[index].cantidad || 0;
    const precioUnitario = productos[index].precioUnitario || 0;
    const totalProducto = cantidad * precioUnitario;

    const updatedProductos = productos.map((item, i) =>
      i === index ? { ...item, totalProducto } : item,
    );

    form.setFieldsValue({ productos: updatedProductos });
  };

  return (
    <div>
      {contextHolder}
      <h1>Nueva Venta</h1>
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
        <Divider orientation="left">Información del Proveedor</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Proveedor"
              name="proveedor"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese el proveedor',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Seleccione un proveedor"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {proveedores?.map((proveedor) => (
                  <Option key={proveedor.id} value={proveedor.id}>
                    {proveedor.name}
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

        <Divider orientation="left">Productos</Divider>
        <Form.List name="productos">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Row gutter={16} key={field.key} align="middle">
                  <Col span={7}>
                    <Form.Item
                      label={index === 0 ? 'Producto' : ''}
                      name={[field.name, 'producto']}
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
                        onChange={(value) => handleProductChange(value, field)}
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
                          calculateProductTotal(index);
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
                  Agregar producto
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

        <Divider orientation="left">Estado de la compra</Divider>
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
            Guardar compra
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

ComprasForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
