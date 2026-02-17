import { useState } from 'react';
import { products as initialProducts } from '../../data/products';
import { categories } from '../../data/categories';
import { Search, Plus, Edit3, Eye, EyeOff, Save, X, Upload } from 'lucide-react';
import './StaffProducts.css';

export default function StaffProducts() {
    const [productList, setProductList] = useState(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);

    const filtered = productList.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = filterCategory === 'all' || p.category === filterCategory;
        return matchSearch && matchCategory;
    });

    const startEdit = (product) => {
        setEditingId(product.id);
        setEditData({ price: product.price, stock: product.stock });
    };

    const saveEdit = (id) => {
        setProductList((prev) =>
            prev.map((p) => (p.id === id ? { ...p, price: Number(editData.price), stock: Number(editData.stock) } : p))
        );
        setEditingId(null);
    };

    const toggleStock = (id) => {
        setProductList((prev) =>
            prev.map((p) => (p.id === id ? { ...p, stock: p.stock === 0 ? 50 : 0 } : p))
        );
    };

    return (
        <div className="staff-products">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="dashboard-page-title">Product Management</h1>
                    <p className="dashboard-page-subtitle">Add, edit, and manage inventory for all products</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <Plus size={18} /> Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="products-toolbar card">
                <div className="input-icon-wrapper" style={{ flex: 1, maxWidth: 360 }}>
                    <Search size={18} />
                    <input className="input" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <select className="input" style={{ width: 'auto' }} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <span className="toolbar-result-count">{filtered.length} products</span>
            </div>

            {/* Products Table */}
            <div className="products-table-wrapper card">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price (₹)</th>
                            <th>MRP (₹)</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((product) => {
                            const isEditing = editingId === product.id;
                            return (
                                <tr key={product.id} className={`product-row ${product.stock === 0 ? 'out-of-stock' : ''}`}>
                                    <td>
                                        <div className="product-cell">
                                            <img src={product.image} alt={product.name} className="product-thumb" />
                                            <div>
                                                <span className="product-cell-name">{product.name}</span>
                                                <span className="product-cell-unit">{product.unit}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.brand}</td>
                                    <td><span className="badge badge-primary">{product.subcategory}</span></td>
                                    <td>
                                        {isEditing ? (
                                            <input className="input inline-edit" type="number" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                                        ) : (
                                            <strong>₹{product.price}</strong>
                                        )}
                                    </td>
                                    <td className="mrp-cell">₹{product.mrp}</td>
                                    <td>
                                        {isEditing ? (
                                            <input className="input inline-edit" type="number" value={editData.stock} onChange={(e) => setEditData({ ...editData, stock: e.target.value })} />
                                        ) : (
                                            <span className={product.stock <= 10 ? 'low-stock-text' : ''}>{product.stock}</span>
                                        )}
                                    </td>
                                    <td>
                                        {product.stock === 0 ? (
                                            <span className="badge badge-danger">Out of Stock</span>
                                        ) : product.stock <= 10 ? (
                                            <span className="badge badge-warning">Low Stock</span>
                                        ) : (
                                            <span className="badge badge-success">In Stock</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="product-actions">
                                            {isEditing ? (
                                                <>
                                                    <button className="btn btn-sm btn-primary" onClick={() => saveEdit(product.id)}><Save size={14} /> Save</button>
                                                    <button className="btn btn-sm btn-ghost" onClick={() => setEditingId(null)}><X size={14} /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="btn btn-sm btn-ghost" onClick={() => startEdit(product)}><Edit3 size={14} /> Edit</button>
                                                    <button className="btn btn-sm btn-ghost" onClick={() => toggleStock(product.id)} title={product.stock === 0 ? 'Mark In Stock' : 'Mark Out of Stock'}>
                                                        {product.stock === 0 ? <Eye size={14} /> : <EyeOff size={14} />}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Product</h2>
                            <button onClick={() => setShowAddModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                <div className="form-group full-width"><label>Product Name</label><input className="input" placeholder="e.g. Basmati Rice Premium" /></div>
                                <div className="form-group"><label>Hindi Name</label><input className="input" placeholder="e.g. बासमती चावल" /></div>
                                <div className="form-group"><label>Brand</label><input className="input" placeholder="e.g. India Gate" /></div>
                                <div className="form-group"><label>Category</label>
                                    <select className="input"><option>Groceries</option><option>Kitchen Utensils</option></select>
                                </div>
                                <div className="form-group"><label>Subcategory</label>
                                    <select className="input"><option>Rice & Flour</option><option>Pulses</option><option>Oils</option></select>
                                </div>
                                <div className="form-group"><label>Price (₹)</label><input className="input" type="number" placeholder="185" /></div>
                                <div className="form-group"><label>MRP (₹)</label><input className="input" type="number" placeholder="220" /></div>
                                <div className="form-group"><label>Stock</label><input className="input" type="number" placeholder="100" /></div>
                                <div className="form-group"><label>Unit</label><input className="input" placeholder="1 kg" /></div>
                                <div className="form-group full-width"><label>Description</label><textarea className="input" rows={3} placeholder="Product description..." /></div>
                                <div className="form-group full-width">
                                    <label>Product Image</label>
                                    <div className="upload-zone">
                                        <Upload size={24} />
                                        <span>Click to upload or drag & drop</span>
                                        <span className="upload-hint">PNG, JPG up to 5MB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => setShowAddModal(false)}>Add Product</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
