import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            authApi.me()
                .then(data => setUser(data.user))
                .catch(() => {
                    localStorage.removeItem('auth_token');
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const handleAuthResponse = useCallback((data) => {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        return data.user;
    }, []);

    // Email + password login
    const login = useCallback(async (email, password) => {
        const data = await authApi.login(email, password);
        return handleAuthResponse(data);
    }, [handleAuthResponse]);

    // Email + password register
    const register = useCallback(async (name, email, password) => {
        const data = await authApi.register(name, email, password);
        return handleAuthResponse(data);
    }, [handleAuthResponse]);

    // Google OAuth
    const loginWithGoogle = useCallback(async (idToken) => {
        const data = await authApi.googleLogin(idToken);
        return handleAuthResponse(data);
    }, [handleAuthResponse]);

    // OTP
    const sendOtp = useCallback(async (email) => {
        return authApi.sendOtp(email);
    }, []);

    const verifyOtp = useCallback(async (email, code) => {
        const data = await authApi.verifyOtp(email, code);
        return handleAuthResponse(data);
    }, [handleAuthResponse]);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem('auth_token');
        setUser(null);
    }, []);

    // Quick login for staff/admin (development helper)
    const devLogin = useCallback(async (role) => {
        const email = `${role}@meghamall.com`;
        const password = 'password123';
        try {
            const data = await authApi.login(email, password);
            return handleAuthResponse(data);
        } catch {
            // Auto-register if not exists
            const data = await authApi.register(
                role.charAt(0).toUpperCase() + role.slice(1),
                email,
                password
            );
            return handleAuthResponse(data);
        }
    }, [handleAuthResponse]);

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
