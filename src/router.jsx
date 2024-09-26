import { createBrowserRouter } from 'react-router-dom';
import LayoutPage from './components/Layout';
import ClientesPage from './pages/Clientes/Clientes.page';
import VentasPage from './pages/Ventas/Ventas.page';
import LoginPage from './pages/Login/Login.page';
import LandingView from './pages/Landing/Landing.page';
import ProveedoresPage from './pages/Proveedores/Proveedores.page';
import PedidosPage from './pages/Pedidos/Pedidos.page';
import CotizacionesPage from './pages/Cotizaciones/Cotizaciones.page';
import Dashboard from './pages/Dashboard/Dashboard.page';
import ComprasPage from './pages/Compras/Compras.page';
import CategoriaPage from './pages/Servicios/Categoria.page';
import AgendaPage from './pages/Servicios/Agenda.page';
import RolesPage from './pages/Configuracion/Roles.page';
import PermisosPage from './pages/Configuracion/Permisos.page';
import PrivilegiosPage from './pages/Configuracion/Privilegios.page';
import UsuariosPage from './pages/Usuarios/Usuarios.page';
import RegisterPage from './pages/Register/Register.page';
import ProductosPage from './pages/Productos/Productos.page';
import ServiciosPage from './pages/Servicios/Servicios.page';
import RecoverPasswordPage from './pages/RecoverPassword/RecoverPassword.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingView />,
  },
  {
    path: '/dashboard',
    element: (
      <LayoutPage>
        <Dashboard />
      </LayoutPage>
    )
  },
  {
    path: '/compras',
    children: [
      {
        path: '',
        element: (
          <LayoutPage>
            <ComprasPage />
          </LayoutPage>
        ),
      },
      {
        path: 'productos',
        element: (
          <LayoutPage>
            <ProductosPage />
          </LayoutPage>
        ),
      },
      {
        path: 'proveedores',
        element: (
          <LayoutPage>
            <ProveedoresPage />
          </LayoutPage>
        ),
      },
    ],
  },
  {
    path: '/servicios',
    children: [
      {
        path: '',
        element: (
          <LayoutPage>
            <ServiciosPage />
          </LayoutPage>
        ),
      },
      {
        path: 'categoria',
        element: (
          <LayoutPage>
            <CategoriaPage />
          </LayoutPage>
        ),
      },
      {
        path: 'agenda',
        element: (
          <LayoutPage>
            <AgendaPage />
          </LayoutPage>
        ),
      },
    ],
  },
  {
    path: '/ventas',
    children: [
      {
        path: '',
        element: (
          <LayoutPage>
            <VentasPage />
          </LayoutPage>
        ),
      },
      {
        path: 'cotizaciones',
        element: (
          <LayoutPage>
            <CotizacionesPage />
          </LayoutPage>
        ),
      },
      {
        path: 'pedidos',
        element: (
          <LayoutPage>
            <PedidosPage />
          </LayoutPage>
        ),
      },
      {
        path: 'clientes',
        element: (
          <LayoutPage>
            <ClientesPage />
          </LayoutPage>
        ),
      },
    ],
  },
  {
    path: '/configuracion',
    children: [
      {
        path: 'roles',
        element: (
          <LayoutPage>
            <RolesPage />
          </LayoutPage>
        ),
      },
      {
        path: 'permisos',
        element: (
          <LayoutPage>
            <PermisosPage />
          </LayoutPage>
        ),
      },
      {
        path: 'privilegios',
        element: (
          <LayoutPage>
            <PrivilegiosPage />
          </LayoutPage>
        ),
      },
    ],
  },
  {
    path: '/usuarios',
    element: (
      <LayoutPage>
        <UsuariosPage />
      </LayoutPage>
    ),
  },
  {
    path: '/register',
    element: (
      <LayoutPage>
        <RegisterPage />
      </LayoutPage>
    ),
  },
  {
    path: '/login',
    element: (
      <LayoutPage>
        <LoginPage />
      </LayoutPage>
    ),
  },
  {
    path: 'forgot-password',
    element: (
      <LayoutPage>
        <RecoverPasswordPage />
      </LayoutPage>
    ),
  }
]);

export default router;