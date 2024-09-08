import { createBrowserRouter } from 'react-router-dom';
import LayoutPage from './components/Layout';
import ClientesPage from './pages/Clientes/Clientes.page';
import VentasPage from './pages/Ventas/Ventas.page';
import LoginPage from './pages/Login/Login.page';
import LandingView from './pages/Landing/Landing.page';
import ProductsPage from './pages/Productos/Products.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingView />,
  },
  {
    path: '/clientes',
    element: (
      <LayoutPage>
        <ClientesPage />
      </LayoutPage>
    ),
  },
  {
    path: '/productos',
    element: (
      <LayoutPage>
        <ProductsPage />
      </LayoutPage>
    ),
  },
  {
    path: '/compras',
    element: (
      <LayoutPage>
        <comprasPage />
      </LayoutPage>
    ),
  },
  {
    path: '/ventas',
    element: (
      <LayoutPage>
        <VentasPage />
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
]);

export default router;
