import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <div className="not-found-illustration">
                    <span className="nf-404">404</span>
                    <span className="nf-emoji">🛒</span>
                </div>
                <h1 className="nf-title">Page Not Found</h1>
                <p className="nf-desc">
                    Oops! The page you're looking for doesn't exist or has been moved.
                    Let's get you back to shopping!
                </p>
                <div className="nf-actions">
                    <Link to="/" className="btn btn-primary">
                        🏠 Back to Home
                    </Link>
                    <Link to="/category/groceries" className="btn btn-secondary">
                        🛒 Browse Groceries
                    </Link>
                </div>
            </div>
        </div>
    );
}
