import './LoadingSpinner.css';

export default function LoadingSpinner() {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="loading-logo">🏪</div>
                <div className="loading-spinner">
                    <div className="spinner-ring" />
                </div>
                <p className="loading-text">Loading Megha Mall...</p>
            </div>
        </div>
    );
}
