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
  HolderOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
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
        key: '/compras',
        icon: <VideoCameraOutlined />,
        label: 'Compras',
      },
      {
        key: '/compras/productos',
        icon: <ProductOutlined />,
        label: 'Productos',
      },
      {
        key: '/compras/proveedores',
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
        key: '/servicios',
        icon: <SelectOutlined />,
        label: 'Servicios',
      },
      {
        key: '/servicios/categoria',
        icon: <BookOutlined />,
        label: 'Categoria',
      },
      {
        key: '/servicios/agenda',
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
        key: '/ventas/cotizaciones',
        icon: <InboxOutlined />,
        label: 'Cotizaciones',
      },
      {
        key: '/ventas/pedidos',
        icon: <SnippetsOutlined />,
        label: 'Pedidos',
      },
      {
        key: '/ventas/clientes',
        icon: <TeamOutlined />,
        label: 'Clientes',
      },
    ],
  },
  {
    key: '/configuracion',
    icon: <SettingOutlined />,
    label: 'Configuracion',
    children: [
      {
        key: '/configuracion/roles',
        icon: <TeamOutlined />,
        label: 'Roles',
      },
      {
        key: '/configuracion/permisos',
        icon: <SolutionOutlined />,
        label: 'Permisos',
      },
      {
        key: '/configuracion/privilegios',
        icon: <HolderOutlined />,
        label: 'Privilegios',
      },
    ],
  },
  {
    key: '/usuarios',
    icon: <UsergroupAddOutlined />,
    label: 'Usuarios',
  },
  {
    key: '/register',
    icon: <UsergroupAddOutlined />,
    label: 'Registro',
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
  const token = Cookies.get('token');
  const filteredNavItems = token
    ? navItems
    : navItems.filter(item => item.key === '/register' || item.key === '/login');

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

  const handleLogout = () => {
    // Logic for logout, e.g., clearing authentication tokens, redirecting to login page, etc.
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear authentication token from cookies
    // You can add more logic here if needed, such as clearing user data from state

    navigate('/login');
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
          items={filteredNavItems}
          onClick={handleMenuClick}
        />
        {token && (
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              width: '100%',
              marginTop: 'auto',
              backgroundColor: '#ff4d4f',
              borderColor: '#ff4d4f',
            }}
          >
            Logout
          </Button>
        )}
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
