import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const { addItem, items } = useCart();
    const [wishlisted, setWishlisted] = useState(false);
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    const inCart = items.find((i) => i.id === product.id);

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    return (
        <Link to={`/product/${product.id}`} className="product-card card">
            <div className="product-card-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
                <button
                    className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted(!wishlisted); }}
                >
                    <Heart size={16} fill={wishlisted ? 'var(--danger)' : 'none'} />
                </button>
                {product.stock <= 5 && product.stock > 0 && (
                    <span className="low-stock-badge">Only {product.stock} left</span>
                )}
            </div>
            <div className="product-card-body">
                <span className="product-card-brand">{product.brand}</span>
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-unit">{product.unit}</p>
                <div className="product-card-rating">
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    <span>{product.rating}</span>
                    <span className="rating-count">({product.reviews})</span>
                </div>
                <div className="product-card-footer">
                    <div className="product-card-price">
                        <span className="price">₹{product.price}</span>
                        {product.mrp > product.price && <span className="price-mrp">₹{product.mrp}</span>}
                    </div>
                    <button
                        className={`btn btn-sm ${inCart ? 'btn-secondary' : 'btn-primary'} add-to-cart-btn`}
                        onClick={handleAdd}
                    >
                        <ShoppingCart size={14} />
                        {inCart ? 'Added' : 'Add'}
                    </button>
                </div>
            </div>
        </Link>
    );
}
