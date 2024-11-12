import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthGuard } from './components/AuthGuard';
import { Login } from './pages/Login';
import { Customers } from './pages/Customers';
import { Analytics } from './pages/Analytics';
import OrdersPage from './pages/orders';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="inventory" element={<div>Inventory Page (Coming Soon)</div>} />
          <Route path="settings" element={<div>Settings Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;