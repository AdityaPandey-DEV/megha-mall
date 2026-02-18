# 🏪 Megha Mall

**Fresh Groceries & Kitchen Essentials — Delivered to Your Door in Dehradun**

A full-featured e-commerce web application built for Megha Mall, a local grocery and kitchen essentials store in Dehradun, Uttarakhand. The platform digitizes the traditional kirana store experience with a modern, responsive interface across three portals.

---

## ✨ Features

### 🛒 Customer Portal
- **Home Page** — Hero section, trust bar, category grid, featured products, promo banners, best sellers
- **Category Browsing** — Subcategory filters, price range, sorting, grid/list view toggle
- **Product Details** — Image gallery, pricing with MRP/discount, quantity selector, guarantees
- **Shopping Cart** — Item management, coupon system (4 codes), dynamic delivery fee, order summary
- **Checkout** — Home delivery / store pickup, address form, time slot selection, multiple payment methods
- **Account** — Profile, order history, saved addresses, wishlist, rewards points

### 👨‍💼 Staff Dashboard
- **Order Management** — Status filter tabs, expandable order details, one-click status progression
- **Product Management** — Search/filter, inline price & stock editing, add product modal
- **Inventory Alerts** — Stock summary cards, low/out-of-stock alerts, reorder suggestions

### 📊 Admin Dashboard
- **Overview** — KPI stats cards, revenue bar chart, order status distribution, recent orders, quick actions
- **Product Analytics** — Category revenue, brand performance, subcategory rankings, price distribution
- **Reports** — Sales/inventory/customer/product report types with date filters and export options
- **Staff Activity** — Team member cards with status, performance metrics, real-time activity log

### 🛡️ Production Features
- **Code Splitting** — React.lazy + Suspense for optimized bundle loading
- **Error Boundary** — Graceful crash recovery with branded fallback UI
- **404 Page** — Professional not-found page with navigation
- **PWA Ready** — Web app manifest for install-to-homescreen
- **SEO Optimized** — Meta tags, Open Graph, Twitter cards, semantic HTML

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite 7 |
| **Routing** | React Router v7 |
| **State** | Context API + useReducer |
| **Icons** | Lucide React |
| **Styling** | Vanilla CSS with Design Tokens |
| **Build** | Vite (SWC) |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/AdityaPandey-DEV/megha-mall.git
cd megha-mall

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173/`

---

## 📁 Project Structure

```
src/
├── context/          # CartContext, AuthContext (global state)
├── components/       # Navbar, Footer, ProductCard, Sidebar, StatsCard, ErrorBoundary
├── layouts/          # CustomerLayout, DashboardLayout
├── data/             # Mock data (products, categories, orders)
├── pages/
│   ├── customer/     # Home, Category, Product, Cart, Checkout, Account
│   ├── staff/        # Orders, Products, Inventory
│   └── admin/        # Overview, Analytics, Reports, StaffActivity
├── App.jsx           # Router + lazy loading + error boundary
└── index.css         # Design system (CSS custom properties)
```

---

## 🗺️ Routes

| Path | Portal | Page |
|------|--------|------|
| `/` | Customer | Home |
| `/category/:id` | Customer | Category |
| `/product/:id` | Customer | Product Detail |
| `/cart` | Customer | Shopping Cart |
| `/checkout` | Customer | Checkout |
| `/account` | Customer | Account |
| `/staff` | Staff | Order Management |
| `/staff/products` | Staff | Product Management |
| `/staff/inventory` | Staff | Inventory Alerts |
| `/admin` | Admin | Dashboard Overview |
| `/admin/analytics` | Admin | Product Analytics |
| `/admin/reports` | Admin | Reports & Exports |
| `/admin/staff-activity` | Admin | Staff Activity |

---

## 🎨 Design System

The app uses a comprehensive CSS custom properties system:
- **Brand Colors** — Orange primary (`#e8590c`) with warm accent palette
- **Typography** — Inter font family with 7 size scales
- **Spacing** — 8-step spacing scale (`--space-1` to `--space-12`)
- **Shadows** — 4 elevation levels (sm, md, lg, xl)
- **Animations** — fadeIn, slideIn, pulse, shimmer

---

## 🎟️ Coupon Codes

| Code | Discount | Min Order |
|------|----------|-----------|
| `WELCOME100` | ₹100 flat off | ₹300 |
| `SAVE10` | 10% off (max ₹200) | ₹500 |
| `FREEDELIVERY` | Free delivery | ₹500 |
| `UTENSIL15` | 15% off utensils (max ₹300) | ₹800 |

---

## 📄 License

MIT © Megha Mall
