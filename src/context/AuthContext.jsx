import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

const mockUsers = {
    customer: { id: 1, name: 'Ravi Sharma', phone: '9876543210', email: 'ravi@example.com', role: 'customer', points: 450, addresses: [{ id: 1, label: 'Home', address: '12, Shanti Nagar, Near Temple', city: 'Dehradun', pin: '248001' }, { id: 2, label: 'Office', address: '45, IT Park, Phase 2', city: 'Dehradun', pin: '248005' }] },
    staff: { id: 2, name: 'Mohit Kumar', phone: '8765432109', email: 'mohit@meghamall.com', role: 'staff' },
    admin: { id: 3, name: 'Harshit (Owner)', phone: '7654321098', email: 'admin@meghamall.com', role: 'admin' },
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = useCallback((role) => {
        setUser(mockUsers[role] || mockUsers.customer);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
