import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import CustomerLayout from './layouts/CustomerLayout';
import DashboardLayout from './layouts/DashboardLayout';

import HomePage from './pages/customer/HomePage';
import CategoryPage from './pages/customer/CategoryPage';
import ProductPage from './pages/customer/ProductPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import AccountPage from './pages/customer/AccountPage';

import StaffOrders from './pages/staff/StaffOrders';
import StaffProducts from './pages/staff/StaffProducts';
import StaffInventory from './pages/staff/StaffInventory';

import AdminOverview from './pages/admin/AdminOverview';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminReports from './pages/admin/AdminReports';
import AdminStaffActivity from './pages/admin/AdminStaffActivity';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Customer Portal */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Route>

            {/* Staff Dashboard */}
            <Route element={<DashboardLayout type="staff" />}>
              <Route path="/staff" element={<StaffOrders />} />
              <Route path="/staff/orders" element={<StaffOrders />} />
              <Route path="/staff/products" element={<StaffProducts />} />
              <Route path="/staff/inventory" element={<StaffInventory />} />
            </Route>

            {/* Admin Dashboard */}
            <Route element={<DashboardLayout type="admin" />}>
              <Route path="/admin" element={<AdminOverview />} />
              <Route path="/admin/overview" element={<AdminOverview />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/staff-activity" element={<AdminStaffActivity />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
