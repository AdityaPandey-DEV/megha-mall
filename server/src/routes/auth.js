import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';
import { authenticate, generateToken } from '../middleware/auth.js';
import { sendOtp, verifyOtp } from '../services/otp.js';
import { verifyGoogleToken } from '../services/google.js';

const router = Router();

// ── Register (email + password) ──────────────────────────────
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                provider: 'local',
                emailVerified: false,
            },
        });

        const token = generateToken(user);
        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// ── Login (email + password) ─────────────────────────────────
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);
        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

// ── Google OAuth ─────────────────────────────────────────────
router.post('/google', async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            return res.status(400).json({ error: 'Google ID token is required' });
        }

        const googleUser = await verifyGoogleToken(idToken);
        if (!googleUser) {
            return res.status(401).json({ error: 'Invalid Google token' });
        }

        // Find or create user
        let user = await prisma.user.findUnique({ where: { email: googleUser.email } });

        if (user) {
            // Link Google ID if not already linked
            if (!user.googleId) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { googleId: googleUser.googleId, avatar: user.avatar || googleUser.avatar, emailVerified: true },
                });
            }
        } else {
            user = await prisma.user.create({
                data: {
                    name: googleUser.name,
                    email: googleUser.email,
                    googleId: googleUser.googleId,
                    avatar: googleUser.avatar,
                    provider: 'google',
                    emailVerified: true,
                },
            });
        }

        const token = generateToken(user);
        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
        });
    } catch (err) {
        console.error('Google auth error:', err);
        res.status(500).json({ error: 'Google authentication failed' });
    }
});

// ── Send OTP ─────────────────────────────────────────────────
router.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        await sendOtp(email);
        res.json({ message: 'OTP sent to your email' });
    } catch (err) {
        console.error('Send OTP error:', err);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

// ── Verify OTP ───────────────────────────────────────────────
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            return res.status(400).json({ error: 'Email and OTP code are required' });
        }

        const otp = await verifyOtp(email, code);
        if (!otp) {
            return res.status(401).json({ error: 'Invalid or expired OTP' });
        }

        // Find or create user
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: email.split('@')[0],
                    email,
                    provider: 'otp',
                    emailVerified: true,
                },
            });
        } else {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: true },
            });
        }

        const token = generateToken(user);
        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
        });
    } catch (err) {
        console.error('Verify OTP error:', err);
        res.status(500).json({ error: 'OTP verification failed' });
    }
});

// ── Get current user ─────────────────────────────────────────
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, role: true, avatar: true, phone: true, emailVerified: true, provider: true, createdAt: true },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        console.error('Get user error:', err);
        res.status(500).json({ error: 'Failed to get user' });
    }
});

export default router;
