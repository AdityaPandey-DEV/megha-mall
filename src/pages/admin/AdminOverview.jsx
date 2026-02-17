import { IndianRupee, ShoppingCart, Users, Package, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { orders, statusLabels, statusColors } from '../../data/orders';
import { products } from '../../data/products';
import StatsCard from '../../components/StatsCard';
import './AdminOverview.css';

export default function AdminOverview() {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const todayOrders = orders.filter((o) => o.status === 'new' || o.status === 'packing').length;
    const avgOrderValue = Math.round(totalRevenue / orders.length);
    const lowStock = products.filter((p) => p.stock <= 10).length;

    const recentOrders = orders.slice(0, 5);

    const topProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

    return (
        <div className="admin-overview">
            <div className="dashboard-page-header">
                <h1 className="dashboard-page-title">Dashboard Overview</h1>
                <p className="dashboard-page-subtitle">Welcome back! Here's how Megha Mall is performing today.</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-row">
                <StatsCard icon={IndianRupee} label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} trend="up" change={12.5} color="primary" />
                <StatsCard icon={ShoppingCart} label="Active Orders" value={todayOrders} trend="up" change={8.2} color="success" />
                <StatsCard icon={Users} label="Customers" value="2,340" trend="up" change={5.1} color="info" />
                <StatsCard icon={Package} label="Low Stock Items" value={lowStock} trend="down" change={3} color="danger" />
            </div>

            <div className="overview-grid">
                {/* Revenue Chart Placeholder */}
                <div className="card overview-chart-card">
                    <h3 className="overview-card-title">Revenue Overview</h3>
                    <div className="chart-placeholder">
                        <div className="mini-bars">
                            {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 72].map((h, i) => (
                                <div key={i} className="mini-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}>
                                    <span className="mini-bar-label">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                                </div>
                            ))}
                        </div>
                        <div className="chart-legend">
                            <span>📈 12.5% growth from last month</span>
                        </div>
                    </div>
                </div>

                {/* Order Status Distribution */}
                <div className="card overview-status-card">
                    <h3 className="overview-card-title">Order Status</h3>
                    <div className="status-distribution">
                        {Object.entries(statusLabels).map(([key, label]) => {
                            const count = orders.filter((o) => o.status === key).length;
                            const pct = Math.round((count / orders.length) * 100);
                            return (
                                <div key={key} className="status-bar-row">
                                    <div className="status-bar-info">
                                        <span className="status-dot-sm" style={{ background: statusColors[key] }} />
                                        <span>{label}</span>
                                        <span className="status-count">{count}</span>
                                    </div>
                                    <div className="status-bar-track">
                                        <div className="status-bar-fill" style={{ width: `${pct}%`, background: statusColors[key] }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="overview-grid">
                {/* Recent Orders */}
                <div className="card overview-recent-card">
                    <h3 className="overview-card-title">Recent Orders</h3>
                    <div className="recent-orders-list">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="recent-order-item">
                                <div className="recent-order-info">
                                    <strong>{order.id}</strong>
                                    <span>{order.customer}</span>
                                </div>
                                <div className="recent-order-meta">
                                    <span className="badge" style={{ background: `${statusColors[order.status]}18`, color: statusColors[order.status], fontSize: '0.7rem' }}>
                                        {statusLabels[order.status]}
                                    </span>
                                    <span className="recent-order-total">₹{order.total}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="card overview-top-card">
                    <h3 className="overview-card-title">Top Products</h3>
                    <div className="top-products-list">
                        {topProducts.map((p, i) => (
                            <div key={p.id} className="top-product-item">
                                <span className="top-rank">#{i + 1}</span>
                                <img src={p.image} alt={p.name} className="top-product-img" />
                                <div className="top-product-info">
                                    <span className="top-product-name">{p.name}</span>
                                    <span className="top-product-brand">{p.brand}</span>
                                </div>
                                <div className="top-product-meta">
                                    <span className="top-product-price">₹{p.price}</span>
                                    <span className="top-product-reviews">⭐ {p.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card quick-actions-card">
                <h3 className="overview-card-title">Quick Actions</h3>
                <div className="quick-actions-grid">
                    {[
                        { label: 'Add Product', icon: '📦', desc: 'List a new product' },
                        { label: 'View Orders', icon: '📋', desc: 'Manage pending orders' },
                        { label: 'Send Notification', icon: '📢', desc: 'Broadcast to customers' },
                        { label: 'Generate Report', icon: '📊', desc: 'Download sales report' },
                        { label: 'Manage Staff', icon: '👥', desc: 'Update staff access' },
                        { label: 'Update Offers', icon: '🏷️', desc: 'Create new promotions' },
                    ].map((action, i) => (
                        <button key={i} className="quick-action-btn">
                            <span className="quick-action-icon">{action.icon}</span>
                            <span className="quick-action-label">{action.label}</span>
                            <span className="quick-action-desc">{action.desc}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
