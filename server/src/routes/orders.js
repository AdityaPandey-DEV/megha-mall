import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// GET /api/orders — list orders (STAFF/ADMIN)
router.get('/', authenticate, authorize('STAFF', 'ADMIN'), async (req, res) => {
    try {
        const { status } = req.query;
        const where = {};
        if (status && status !== 'all') where.status = status;

        const orders = await prisma.order.findMany({
            where,
            include: { items: true },
            orderBy: { createdAt: 'desc' },
        });

        // Map to frontend format
        const mapped = orders.map(o => ({
            id: o.orderNumber,
            dbId: o.id,
            customer: o.customer || 'Customer',
            phone: o.phone || '',
            items: o.items.map(i => ({ name: i.name, qty: i.quantity, price: i.price })),
            total: o.total,
            status: o.status,
            payment: o.paymentMode,
            date: o.createdAt.toISOString().split('T')[0],
            address: o.address || '',
            deliveryType: o.deliveryType === 'delivery' ? 'home' : 'pickup',
            timeSlot: o.timeSlot || '',
        }));

        res.json({ orders: mapped });
    } catch (err) {
        console.error('Orders fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// GET /api/orders/:id — single order
router.get('/:id', authenticate, async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.id },
            include: { items: true },
        });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json({ order });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// POST /api/orders — create order (CUSTOMER)
router.post('/', authenticate, async (req, res) => {
    try {
        const { items, subtotal, discount, deliveryFee, total, deliveryType, paymentMode, addressId, timeSlot, customer, phone, address } = req.body;
        if (!items || !items.length || !total) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Generate order number
        const count = await prisma.order.count();
        const orderNumber = `ORD-${String(count + 1001).padStart(4, '0')}`;

        const order = await prisma.order.create({
            data: {
                orderNumber,
                userId: req.user.id,
                subtotal: parseFloat(subtotal) || total,
                discount: parseFloat(discount) || 0,
                deliveryFee: parseFloat(deliveryFee) || 0,
                total: parseFloat(total),
                deliveryType: deliveryType || 'delivery',
                paymentMode: paymentMode || 'cod',
                addressId: addressId || null,
                customer: customer || req.user.name,
                phone: phone || '',
                address: address || '',
                timeSlot: timeSlot || '',
                items: {
                    create: items.map(i => ({
                        name: i.name,
                        price: parseFloat(i.price),
                        quantity: parseInt(i.quantity) || 1,
                        image: i.image || null,
                    })),
                },
            },
            include: { items: true },
        });

        res.status(201).json({ order });
    } catch (err) {
        console.error('Order create error:', err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// PATCH /api/orders/:id/status — update status (STAFF/ADMIN)
router.patch('/:id/status', authenticate, authorize('STAFF', 'ADMIN'), async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['new', 'packing', 'packed', 'dispatched', 'delivered'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await prisma.order.update({
            where: { id: req.params.id },
            data: { status },
            include: { items: true },
        });

        res.json({ order });
    } catch (err) {
        console.error('Order status update error:', err);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

export default router;
