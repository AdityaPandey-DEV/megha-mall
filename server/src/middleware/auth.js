import jwt from 'jsonwebtoken';

// Verify JWT and attach user to req
export function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const token = header.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// Role-based access control
export function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
}

// Generate JWT
export function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}
