import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
  ProductOutlined,
  InboxOutlined,
  SnippetsOutlined,
  BarChartOutlined,
  BookOutlined,
  CalendarOutlined,
  SelectOutlined,
  SettingOutlined,
  TeamOutlined,
  SolutionOutlined,
  HolderOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const navItems = [
  {
    key: '/dashboard',
    icon: <BarChartOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/compras',
    icon: <VideoCameraOutlined />,
    label: 'Compras',
    children: [
      {
        key: '/productos',
        icon: <ProductOutlined />,
        label: 'Productos',
      },
      {
        key: '/proveedores',
        icon: <TeamOutlined />,
        label: 'Proveedores',
      },
    ],
  },
  {
    key: '/servicios',
    icon: <SelectOutlined />,
    label: 'Servicios',
    children: [
      {
        key: '/categoria',
        icon: <BookOutlined />,
        label: 'Categoria',
      },
      {
        key: '/agenda',
        icon: <CalendarOutlined />,
        label: 'Agenda',
      },
    ],
  },
  {
    key: '/ventas',
    icon: <UploadOutlined />,
    label: 'Ventas',
    children: [
      {
        key: '/ventas',
        icon: <UploadOutlined />,
        label: 'Ventas',
      },
      {
        key: '/cotizaciones',
        icon: <InboxOutlined />,
        label: 'Cotizaciones',
      },
      {
        key: '/pedidos',
        icon: <SnippetsOutlined />,
        label: 'Pedidos',
      },
      {
        key: '/clientes',
        icon: <TeamOutlined />,
        label: 'Clientes',
      }

    ]
  },
  {
    key: '/configuracion',
    icon: <SettingOutlined />,
    label: 'Configuracion',
    children: [
      {
        key: '/roles',
        icon: <TeamOutlined />,
        label: 'Roles',
      },
      {
        key: '/permisos',
        icon: <SolutionOutlined />,
        label: 'Permisos',
      },
      {
        key: '/privilegios',
        icon: <HolderOutlined />,
        label: 'Privilegios',
      }
    ]
  },
  {
    key: '/usuarios',
    icon: <UsergroupAddOutlined />,
    label: 'Usuarios',
  },
  {
    key: '/register',
    icon: <UsergroupAddOutlined />,
    label: 'Register',
  },
  {
    key: '/login',
    icon: <LoginOutlined />,
    label: 'Login',
  },
];

const LayoutPage = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const findItem = (items, path) => {
      for (const item of items) {
        if (item.key === path) {
          return item;
        }
        if (item.children) {
          const foundChild = findItem(item.children, path);
          if (foundChild) {
            return foundChild;
          }
        }
      }
      return null;
    };
    const item = findItem(navItems, location.pathname);
    if (item) {
      setSelectedTitle(item.label);
    } else {
      setSelectedTitle(navItems[0].label);
    }
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    navigate(key); // Cambiar la URL al seleccionar un item
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        {!collapsed ? (
          <h2 style={{ color: 'white', textAlign: 'center', padding: '15px' }}>
            SoftSolutions
          </h2>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <img
              src="https://grupomilsoluciones.com/wp-content/uploads/favicon.png"
              alt="Logo SoftSolutions"
              style={{ width: '40px', height: '40px' }}
            />
          </div>
        )}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={navItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <h1 style={{ color: '#e0e0e0', marginLeft: 16 }}>{selectedTitle}</h1>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;

LayoutPage.propTypes = {
  children: PropTypes.node.isRequired,
};
