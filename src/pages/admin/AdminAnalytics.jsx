import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { BarChart3, PieChart, TrendingUp, Award, DollarSign } from 'lucide-react';
import './AdminAnalytics.css';

export default function AdminAnalytics() {
    const categoryData = categories.map((cat) => {
        const catProducts = products.filter((p) => p.category === cat.id);
        const revenue = catProducts.reduce((sum, p) => sum + p.price * (Math.floor(Math.random() * 20) + 5), 0);
        return { ...cat, products: catProducts.length, revenue };
    });

    const subcategoryData = categories.flatMap((cat) =>
        cat.subcategories.map((sub) => {
            const subProducts = products.filter((p) => p.subcategory === sub.id);
            const revenue = subProducts.reduce((sum, p) => sum + p.price * (Math.floor(Math.random() * 15) + 3), 0);
            return { ...sub, category: cat.name, products: subProducts.length, revenue };
        })
    ).sort((a, b) => b.revenue - a.revenue);

    const brandData = [...new Set(products.map((p) => p.brand))].map((brand) => {
        const brandProducts = products.filter((p) => p.brand === brand);
        const avgRating = (brandProducts.reduce((sum, p) => sum + p.rating, 0) / brandProducts.length).toFixed(1);
        return { brand, count: brandProducts.length, avgRating, avgPrice: Math.round(brandProducts.reduce((s, p) => s + p.price, 0) / brandProducts.length) };
    }).sort((a, b) => b.count - a.count).slice(0, 10);

    return (
        <div className="admin-analytics">
            <div className="dashboard-page-header">
                <h1 className="dashboard-page-title">Product Analytics</h1>
                <p className="dashboard-page-subtitle">Deep dive into product performance and category insights</p>
            </div>

            {/* Category Performance */}
            <div className="analytics-grid">
                <div className="card analytics-card">
                    <h3 className="analytics-card-title"><PieChart size={18} /> Category Revenue Split</h3>
                    <div className="category-bars">
                        {categoryData.map((cat, i) => (
                            <div key={cat.id} className="category-bar-item">
                                <div className="cat-bar-header">
                                    <span className="cat-icon">{cat.icon}</span>
                                    <span className="cat-name">{cat.name}</span>
                                    <span className="cat-revenue">₹{cat.revenue.toLocaleString()}</span>
                                </div>
                                <div className="cat-bar-track">
                                    <div className="cat-bar-fill" style={{ width: `${Math.min(100, (cat.revenue / Math.max(...categoryData.map(c => c.revenue))) * 100)}%`, background: i === 0 ? 'var(--primary)' : 'var(--info)' }} />
                                </div>
                                <span className="cat-product-count">{cat.products} products</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card analytics-card">
                    <h3 className="analytics-card-title"><Award size={18} /> Brand Performance</h3>
                    <div className="brand-table">
                        <div className="brand-row brand-header">
                            <span>Brand</span><span>Products</span><span>Avg Rating</span><span>Avg Price</span>
                        </div>
                        {brandData.map((b) => (
                            <div key={b.brand} className="brand-row">
                                <span className="brand-name">{b.brand}</span>
                                <span>{b.count}</span>
                                <span>⭐ {b.avgRating}</span>
                                <span>₹{b.avgPrice}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subcategory Table */}
            <div className="card analytics-card">
                <h3 className="analytics-card-title"><BarChart3 size={18} /> Subcategory Performance</h3>
                <div className="sub-table-wrapper">
                    <table className="sub-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Subcategory</th>
                                <th>Category</th>
                                <th>Products</th>
                                <th>Revenue</th>
                                <th>Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategoryData.map((sub, i) => {
                                const maxRev = subcategoryData[0]?.revenue || 1;
                                return (
                                    <tr key={sub.id}>
                                        <td><span className={`rank-badge ${i < 3 ? 'top' : ''}`}>#{i + 1}</span></td>
                                        <td><strong>{sub.name}</strong><br /><span className="sub-hi">{sub.nameHi}</span></td>
                                        <td>{sub.category}</td>
                                        <td>{sub.products}</td>
                                        <td className="rev-cell">₹{sub.revenue.toLocaleString()}</td>
                                        <td>
                                            <div className="perf-bar-track">
                                                <div className="perf-bar-fill" style={{ width: `${(sub.revenue / maxRev) * 100}%` }} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Price Distribution */}
            <div className="analytics-grid">
                <div className="card analytics-card">
                    <h3 className="analytics-card-title"><DollarSign size={18} /> Price Distribution</h3>
                    <div className="price-distribution">
                        {[
                            { range: 'Under ₹100', count: products.filter(p => p.price < 100).length },
                            { range: '₹100 - ₹300', count: products.filter(p => p.price >= 100 && p.price < 300).length },
                            { range: '₹300 - ₹500', count: products.filter(p => p.price >= 300 && p.price < 500).length },
                            { range: '₹500 - ₹1000', count: products.filter(p => p.price >= 500 && p.price < 1000).length },
                            { range: '₹1000+', count: products.filter(p => p.price >= 1000).length },
                        ].map((range) => (
                            <div key={range.range} className="price-range-item">
                                <span className="price-range-label">{range.range}</span>
                                <div className="price-range-bar-track">
                                    <div className="price-range-bar" style={{ width: `${(range.count / products.length) * 100}%` }} />
                                </div>
                                <span className="price-range-count">{range.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card analytics-card">
                    <h3 className="analytics-card-title"><TrendingUp size={18} /> Key Insights</h3>
                    <div className="insights-list">
                        {[
                            { icon: '🔥', text: 'Spices & Masalas has the highest revenue in groceries', type: 'positive' },
                            { icon: '📈', text: 'Cookware saw 23% increase in orders this month', type: 'positive' },
                            { icon: '⚠️', text: '3 products have been out of stock for over 5 days', type: 'warning' },
                            { icon: '💡', text: 'Customers from Rajpur Road have highest avg order value', type: 'info' },
                            { icon: '🏷️', text: 'Discounted products show 2x conversion rate', type: 'positive' },
                        ].map((insight, i) => (
                            <div key={i} className={`insight-item ${insight.type}`}>
                                <span className="insight-icon">{insight.icon}</span>
                                <span>{insight.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
