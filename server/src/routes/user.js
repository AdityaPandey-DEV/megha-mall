import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// ── Update profile ───────────────────────────────────────────
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { name, phone, avatar } = req.body;

        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                ...(name && { name }),
                ...(phone && { phone }),
                ...(avatar && { avatar }),
            },
            select: { id: true, name: true, email: true, role: true, avatar: true, phone: true },
        });

        res.json({ user });
    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// ── Change password ──────────────────────────────────────────
router.put('/password', authenticate, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters' });
        }

        const user = await prisma.user.findUnique({ where: { id: req.user.id } });

        // If user has a password, verify the current one
        if (user.password) {
            if (!currentPassword) {
                return res.status(400).json({ error: 'Current password is required' });
            }
            const valid = await bcrypt.compare(currentPassword, user.password);
            if (!valid) {
                return res.status(401).json({ error: 'Current password is incorrect' });
            }
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: req.user.id },
            data: { password: hashed },
        });

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Change password error:', err);
        res.status(500).json({ error: 'Failed to change password' });
    }
});

// ── Get addresses ────────────────────────────────────────────
router.get('/addresses', authenticate, async (req, res) => {
    try {
        const addresses = await prisma.address.findMany({
            where: { userId: req.user.id },
            orderBy: { isDefault: 'desc' },
        });
        res.json({ addresses });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get addresses' });
    }
});

// ── Add address ──────────────────────────────────────────────
router.post('/addresses', authenticate, async (req, res) => {
    try {
        const { label, name, phone, line1, line2, city, state, pincode, isDefault } = req.body;

        if (isDefault) {
            await prisma.address.updateMany({
                where: { userId: req.user.id },
                data: { isDefault: false },
            });
        }

        const address = await prisma.address.create({
            data: { label, name, phone, line1, line2, city, state, pincode, isDefault: !!isDefault, userId: req.user.id },
        });

        res.status(201).json({ address });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add address' });
    }
});

export default router;
