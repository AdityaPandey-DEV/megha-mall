import './LoadingSpinner.css';

export default function LoadingSpinner() {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <img src="/favicon.svg" alt="Megha Mall" className="loading-logo" width="48" height="48" />
                <div className="loading-spinner">
                    <div className="spinner-ring" />
                </div>
                <p className="loading-text">Loading Megha Mall...</p>
            </div>
        </div>
    );
}
