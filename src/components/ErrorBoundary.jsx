import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    background: '#fafafa',
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
                        Something went wrong
                    </h1>
                    <p style={{ color: '#6b7280', maxWidth: '400px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        We apologize for the inconvenience. Please try refreshing the page or go back to the home page.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #e8590c, #f97316)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                            }}
                        >
                            Refresh Page
                        </button>
                        <button
                            onClick={() => (window.location.href = '/')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'white',
                                color: '#111827',
                                border: '1.5px solid #e5e7eb',
                                borderRadius: '10px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                            }}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
