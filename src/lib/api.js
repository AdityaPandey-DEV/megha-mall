const API_BASE = '/api';

async function request(endpoint, options = {}) {
    const token = localStorage.getItem('auth_token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Request failed');
    }

    return data;
}

// ── Auth API ──────────────────────────────────────────────
export const authApi = {
    register: (name, email, password) =>
        request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

    login: (email, password) =>
        request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

    googleLogin: (idToken) =>
        request('/auth/google', { method: 'POST', body: JSON.stringify({ idToken }) }),

    sendOtp: (email) =>
        request('/auth/send-otp', { method: 'POST', body: JSON.stringify({ email }) }),

    verifyOtp: (email, code) =>
        request('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, code }) }),

    me: () => request('/auth/me'),
};

// ── User API ──────────────────────────────────────────────
export const userApi = {
    updateProfile: (data) =>
        request('/user/profile', { method: 'PUT', body: JSON.stringify(data) }),

    changePassword: (currentPassword, newPassword) =>
        request('/user/password', { method: 'PUT', body: JSON.stringify({ currentPassword, newPassword }) }),

    getAddresses: () => request('/user/addresses'),

    addAddress: (data) =>
        request('/user/addresses', { method: 'POST', body: JSON.stringify(data) }),
};
