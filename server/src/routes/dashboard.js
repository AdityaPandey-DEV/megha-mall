import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// GET /api/dashboard/stats — KPI stats (ADMIN)
router.get('/stats', authenticate, authorize('STAFF', 'ADMIN'), async (req, res) => {
    try {
        const [orders, products, users] = await Promise.all([
            prisma.order.findMany({ select: { total: true, status: true } }),
            prisma.product.findMany({ where: { isActive: true }, select: { stock: true } }),
            prisma.user.count({ where: { role: 'CUSTOMER' } }),
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const activeOrders = orders.filter(o => ['new', 'packing', 'packed', 'dispatched'].includes(o.status)).length;
        const lowStock = products.filter(p => p.stock <= 10).length;
        const totalProducts = products.length;

        const statusCounts = {};
        for (const o of orders) {
            statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
        }

        res.json({
            stats: { totalRevenue, activeOrders, customers: users, lowStock, totalProducts, totalOrders: orders.length },
            statusCounts,
        });
    } catch (err) {
        console.error('Dashboard stats error:', err);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// GET /api/dashboard/top-products — top products by reviews (ADMIN)
router.get('/top-products', authenticate, authorize('STAFF', 'ADMIN'), async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: { isActive: true },
            orderBy: { reviews: 'desc' },
            take: 5,
        });
        res.json({ products });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch top products' });
    }
});

export default router;
