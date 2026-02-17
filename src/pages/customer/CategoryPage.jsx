import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { getProductsByCategory, getProductsBySubcategory } from '../../data/products';
import { getCategoryById } from '../../data/categories';
import './CategoryPage.css';

export default function CategoryPage() {
    const { categoryId } = useParams();
    const [searchParams] = useSearchParams();
    const subId = searchParams.get('sub');

    const category = getCategoryById(categoryId);
    const [sortBy, setSortBy] = useState('popular');
    const [priceRange, setPriceRange] = useState('all');
    const [activeSub, setActiveSub] = useState(subId || 'all');
    const [viewMode, setViewMode] = useState('grid');

    const allProducts = useMemo(() => {
        if (activeSub && activeSub !== 'all') {
            return getProductsBySubcategory(categoryId, activeSub);
        }
        return getProductsByCategory(categoryId);
    }, [categoryId, activeSub]);

    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            result = result.filter((p) => p.price >= min && (max ? p.price <= max : true));
        }

        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            case 'rating': result.sort((a, b) => b.rating - a.rating); break;
            case 'discount': result.sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp); break;
            default: result.sort((a, b) => b.reviews - a.reviews);
        }

        return result;
    }, [allProducts, sortBy, priceRange]);

    if (!category) return <div className="container section"><h2>Category not found</h2></div>;

    return (
        <div className="category-page">
            <div className="category-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(232,89,12,0.85), rgba(249,115,22,0.75)), url(${category.image})` }}>
                <div className="container">
                    <span className="category-hero-icon">{category.icon}</span>
                    <h1>{category.name}</h1>
                    <p>{category.nameHi} • {allProducts.length} products</p>
                </div>
            </div>

            <div className="container category-content">
                {/* Subcategory Pills */}
                <div className="sub-pills">
                    <button className={`sub-pill ${activeSub === 'all' ? 'active' : ''}`} onClick={() => setActiveSub('all')}>
                        All
                    </button>
                    {category.subcategories.map((sub) => (
                        <button
                            key={sub.id}
                            className={`sub-pill ${activeSub === sub.id ? 'active' : ''}`}
                            onClick={() => setActiveSub(sub.id)}
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="category-toolbar">
                    <div className="toolbar-left">
                        <SlidersHorizontal size={16} />
                        <select className="input" style={{ width: 'auto' }} value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                            <option value="all">All Prices</option>
                            <option value="0-100">Under ₹100</option>
                            <option value="100-300">₹100 - ₹300</option>
                            <option value="300-500">₹300 - ₹500</option>
                            <option value="500-1000">₹500 - ₹1,000</option>
                            <option value="1000-99999">Above ₹1,000</option>
                        </select>
                        <select className="input" style={{ width: 'auto' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="popular">Most Popular</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="discount">Best Discount</option>
                        </select>
                    </div>
                    <div className="toolbar-right">
                        <span className="result-count">{filteredProducts.length} products</span>
                        <button className={`btn btn-icon btn-ghost ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid3X3 size={18} /></button>
                        <button className={`btn btn-icon btn-ghost ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={18} /></button>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className={`grid ${viewMode === 'grid' ? 'grid-4' : 'grid-1'}`}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <span className="empty-icon">🔍</span>
                        <h3>No products found</h3>
                        <p>Try adjusting your filters or browse a different category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
