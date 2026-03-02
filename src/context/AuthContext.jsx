import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

// Demo users for offline / no-backend mode
const DEMO_USERS = {
    customer: { id: 'demo-customer', name: 'Customer', email: 'customer@meghamall.com', role: 'CUSTOMER', avatar: null },
    staff: { id: 'demo-staff', name: 'Staff Member', email: 'staff@meghamall.com', role: 'STAFF', avatar: null },
    admin: { id: 'demo-admin', name: 'Admin', email: 'admin@meghamall.com', role: 'ADMIN', avatar: null },
};

// Try API call, return null on network failure (allows offline mode)
async function tryApi(endpoint, options = {}) {
    const token = localStorage.getItem('auth_token');
    try {
        const res = await fetch(`/api${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');
        return data;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const stored = localStorage.getItem('megha_user');
        const token = localStorage.getItem('auth_token');

        if (stored) {
            // Restore from localStorage (works offline)
            setUser(JSON.parse(stored));
            setLoading(false);
            // Optionally validate token with backend
            if (token) {
                tryApi('/auth/me').then(data => {
                    if (data?.user) {
                        setUser(data.user);
                        localStorage.setItem('megha_user', JSON.stringify(data.user));
                    }
                });
            }
        } else if (token) {
            tryApi('/auth/me').then(data => {
                if (data?.user) {
                    setUser(data.user);
                    localStorage.setItem('megha_user', JSON.stringify(data.user));
                }
            }).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const persistUser = useCallback((userData, token) => {
        if (token) localStorage.setItem('auth_token', token);
        localStorage.setItem('megha_user', JSON.stringify(userData));
        setUser(userData);
        return userData;
    }, []);

    // Email + password login
    const login = useCallback(async (email, password) => {
        const data = await tryApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (data?.token) {
            return persistUser(data.user, data.token);
        }
        // Fallback demo mode
        const demoUser = { ...DEMO_USERS.customer, email, name: email.split('@')[0] };
        return persistUser(demoUser, 'demo-token');
    }, [persistUser]);

    // Email + password register
    const register = useCallback(async (name, email, password) => {
        const data = await tryApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
        if (data?.token) {
            return persistUser(data.user, data.token);
        }
        // Fallback demo mode
        const demoUser = { ...DEMO_USERS.customer, name, email };
        return persistUser(demoUser, 'demo-token');
    }, [persistUser]);

    // Google OAuth
    const loginWithGoogle = useCallback(async (idToken) => {
        const data = await tryApi('/auth/google', {
            method: 'POST',
            body: JSON.stringify({ idToken }),
        });
        if (data?.token) {
            return persistUser(data.user, data.token);
        }
        throw new Error('Google login requires a running backend');
    }, [persistUser]);

    // OTP
    const sendOtp = useCallback(async (email) => {
        const data = await tryApi('/auth/send-otp', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
        if (data) return data;
        // Demo fallback — pretend OTP was sent
        return { message: 'Demo mode: Use code 123456' };
    }, []);

    const verifyOtp = useCallback(async (email, code) => {
        const data = await tryApi('/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ email, code }),
        });
        if (data?.token) {
            return persistUser(data.user, data.token);
        }
        // Demo fallback
        if (code === '123456') {
            const demoUser = { ...DEMO_USERS.customer, email, name: email.split('@')[0] };
            return persistUser(demoUser, 'demo-token');
        }
        throw new Error('Invalid OTP code');
    }, [persistUser]);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('megha_user');
        setUser(null);
    }, []);

    // Quick login for staff/admin (development + demo helper)
    const devLogin = useCallback(async (role) => {
        const email = `${role}@meghamall.com`;
        const password = 'password123';

        // Try real backend first
        const loginData = await tryApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (loginData?.token) {
            return persistUser(loginData.user, loginData.token);
        }

        // Try register
        const regData = await tryApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name: role.charAt(0).toUpperCase() + role.slice(1), email, password }),
        });
        if (regData?.token) {
            return persistUser(regData.user, regData.token);
        }

        // Fallback to demo user
        const demoUser = DEMO_USERS[role] || DEMO_USERS.customer;
        return persistUser(demoUser, 'demo-token');
    }, [persistUser]);

    const value = {
        user,
        loading,
        isLoggedIn: !!user,
        login,
        register,
        loginWithGoogle,
        sendOtp,
        verifyOtp,
        logout,
        devLogin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
