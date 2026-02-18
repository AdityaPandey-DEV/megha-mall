import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

import CustomerLayout from './layouts/CustomerLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Lazy-loaded pages (code splitting)
const HomePage = lazy(() => import('./pages/customer/HomePage'));
const CategoryPage = lazy(() => import('./pages/customer/CategoryPage'));
const ProductPage = lazy(() => import('./pages/customer/ProductPage'));
const CartPage = lazy(() => import('./pages/customer/CartPage'));
const CheckoutPage = lazy(() => import('./pages/customer/CheckoutPage'));
const AccountPage = lazy(() => import('./pages/customer/AccountPage'));

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));

const StaffOrders = lazy(() => import('./pages/staff/StaffOrders'));
const StaffProducts = lazy(() => import('./pages/staff/StaffProducts'));
const StaffInventory = lazy(() => import('./pages/staff/StaffInventory'));

const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminStaffActivity = lazy(() => import('./pages/admin/AdminStaffActivity'));

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Auth Pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Customer Portal */}
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/product/:productId" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute><CheckoutPage /></ProtectedRoute>
                  } />
                  <Route path="/account" element={
                    <ProtectedRoute><AccountPage /></ProtectedRoute>
                  } />
                </Route>

                {/* Staff Dashboard */}
                <Route element={
                  <ProtectedRoute roles={['STAFF', 'ADMIN']}>
                    <DashboardLayout type="staff" />
                  </ProtectedRoute>
                }>
                  <Route path="/staff" element={<StaffOrders />} />
                  <Route path="/staff/orders" element={<StaffOrders />} />
                  <Route path="/staff/products" element={<StaffProducts />} />
                  <Route path="/staff/inventory" element={<StaffInventory />} />
                </Route>

                {/* Admin Dashboard */}
                <Route element={
                  <ProtectedRoute roles={['ADMIN']}>
                    <DashboardLayout type="admin" />
                  </ProtectedRoute>
                }>
                  <Route path="/admin" element={<AdminOverview />} />
                  <Route path="/admin/overview" element={<AdminOverview />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/staff-activity" element={<AdminStaffActivity />} />
                </Route>

                {/* 404 Catch-all */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
