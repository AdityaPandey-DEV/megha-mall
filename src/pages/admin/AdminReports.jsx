import { useState } from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { orders, statusLabels } from '../../data/orders';
import { products } from '../../data/products';
import './AdminReports.css';

export default function AdminReports() {
    const [reportType, setReportType] = useState('sales');
    const [dateRange, setDateRange] = useState('this-month');

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const avgOrderValue = Math.round(totalRevenue / orders.length);
    const totalItems = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0), 0);

    const reports = [
        { id: 'sales', label: 'Sales Report', icon: '💰', desc: 'Revenue, orders, and transaction details' },
        { id: 'inventory', label: 'Inventory Report', icon: '📦', desc: 'Stock levels, reorder alerts, and movement' },
        { id: 'customer', label: 'Customer Report', icon: '👥', desc: 'Customer activity, retention, and segments' },
        { id: 'product', label: 'Product Report', icon: '🏷️', desc: 'Top sellers, slow movers, and pricing' },
    ];

    return (
        <div className="admin-reports">
            <div className="dashboard-page-header">
                <h1 className="dashboard-page-title">Reports & Exports</h1>
                <p className="dashboard-page-subtitle">Generate, download, and schedule business reports</p>
            </div>

            {/* Report Type Selector */}
            <div className="report-selector">
                {reports.map((r) => (
                    <button
                        key={r.id}
                        className={`report-type-btn card ${reportType === r.id ? 'active' : ''}`}
                        onClick={() => setReportType(r.id)}
                    >
                        <span className="report-type-icon">{r.icon}</span>
                        <span className="report-type-label">{r.label}</span>
                        <span className="report-type-desc">{r.desc}</span>
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="report-filters card">
                <div className="filter-row">
                    <div className="filter-item">
                        <Calendar size={16} />
                        <select className="input" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                            <option value="today">Today</option>
                            <option value="this-week">This Week</option>
                            <option value="this-month">This Month</option>
                            <option value="last-month">Last Month</option>
                            <option value="this-quarter">This Quarter</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>
                    <div className="filter-actions">
                        <button className="btn btn-primary"><FileText size={16} /> Generate Report</button>
                        <button className="btn btn-secondary"><Download size={16} /> Export CSV</button>
                        <button className="btn btn-secondary"><Download size={16} /> Export PDF</button>
                    </div>
                </div>
            </div>

            {/* Report Preview */}
            <div className="report-preview card">
                <h3 className="report-preview-title">
                    {reports.find(r => r.id === reportType)?.icon} {reports.find(r => r.id === reportType)?.label} — {dateRange.replace('-', ' ')}
                </h3>

                {reportType === 'sales' && (
                    <>
                        <div className="report-summary-row">
                            <div className="report-metric">
                                <span className="metric-label">Total Revenue</span>
                                <span className="metric-value">₹{totalRevenue.toLocaleString()}</span>
                            </div>
                            <div className="report-metric">
                                <span className="metric-label">Total Orders</span>
                                <span className="metric-value">{orders.length}</span>
                            </div>
                            <div className="report-metric">
                                <span className="metric-label">Avg Order Value</span>
                                <span className="metric-value">₹{avgOrderValue}</span>
                            </div>
                            <div className="report-metric">
                                <span className="metric-label">Items Sold</span>
                                <span className="metric-value">{totalItems}</span>
                            </div>
                        </div>

                        <table className="report-table">
                            <thead>
                                <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Payment</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td><strong>{order.id}</strong></td>
                                        <td>{order.customer}</td>
                                        <td>{order.items.length}</td>
                                        <td>₹{order.total}</td>
                                        <td>{order.payment}</td>
                                        <td>{statusLabels[order.status]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {reportType === 'inventory' && (
                    <table className="report-table">
                        <thead>
                            <tr><th>Product</th><th>Brand</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            {products.slice(0, 15).map((p) => (
                                <tr key={p.id}>
                                    <td><strong>{p.name}</strong></td>
                                    <td>{p.brand}</td>
                                    <td>{p.subcategory}</td>
                                    <td>₹{p.price}</td>
                                    <td>{p.stock}</td>
                                    <td>
                                        <span className={`badge ${p.stock === 0 ? 'badge-danger' : p.stock <= 10 ? 'badge-warning' : 'badge-success'}`}>
                                            {p.stock === 0 ? 'Out' : p.stock <= 10 ? 'Low' : 'OK'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {reportType === 'customer' && (
                    <div className="placeholder-report">
                        <span className="placeholder-icon">👥</span>
                        <h3>Customer Report</h3>
                        <p>2,340 total customers • 156 new this month • 78% retention rate</p>
                        <div className="customer-segments">
                            {[
                                { label: 'Regular Buyers (5+ orders)', count: 890, color: 'var(--success)' },
                                { label: 'Occasional Buyers (2-4 orders)', count: 720, color: 'var(--info)' },
                                { label: 'One-Time Buyers', count: 450, color: 'var(--warning)' },
                                { label: 'Inactive (90+ days)', count: 280, color: 'var(--danger)' },
                            ].map((seg) => (
                                <div key={seg.label} className="segment-item">
                                    <span className="segment-dot" style={{ background: seg.color }} />
                                    <span>{seg.label}</span>
                                    <strong>{seg.count}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {reportType === 'product' && (
                    <div className="placeholder-report">
                        <span className="placeholder-icon">🏷️</span>
                        <h3>Product Performance Report</h3>
                        <p>{products.length} total products • {products.filter(p => p.stock === 0).length} out of stock • Avg rating: {(products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)}</p>
                        <div className="product-report-grid">
                            <div className="product-report-section">
                                <h4>🔥 Top 5 Sellers</h4>
                                {[...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5).map((p, i) => (
                                    <div key={p.id} className="product-report-item">
                                        <span className="pr-rank">#{i + 1}</span>
                                        <span>{p.name}</span>
                                        <span className="pr-reviews">{p.reviews} reviews</span>
                                    </div>
                                ))}
                            </div>
                            <div className="product-report-section">
                                <h4>⚠️ Low Performers</h4>
                                {[...products].sort((a, b) => a.reviews - b.reviews).slice(0, 5).map((p, i) => (
                                    <div key={p.id} className="product-report-item">
                                        <span className="pr-rank low">#{i + 1}</span>
                                        <span>{p.name}</span>
                                        <span className="pr-reviews">{p.reviews} reviews</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
