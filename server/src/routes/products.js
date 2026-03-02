import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// GET /api/products — list all products (public)
router.get('/', async (req, res) => {
    try {
        const { category, subcategory, search, sort, limit } = req.query;
        const where = { isActive: true };

        if (category) where.category = category;
        if (subcategory) where.subcategory = subcategory;
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { nameHi: { contains: search } },
                { brand: { contains: search } },
                { description: { contains: search } },
            ];
        }

        let orderBy = { createdAt: 'desc' };
        if (sort === 'price-low') orderBy = { price: 'asc' };
        else if (sort === 'price-high') orderBy = { price: 'desc' };
        else if (sort === 'rating') orderBy = { rating: 'desc' };
        else if (sort === 'reviews') orderBy = { reviews: 'desc' };

        const products = await prisma.product.findMany({
            where,
            orderBy,
            take: limit ? parseInt(limit) : undefined,
        });

        res.json({ products });
    } catch (err) {
        console.error('Products fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /api/products/:id — single product (public)
router.get('/:id', async (req, res) => {
    try {
        const product = await prisma.product.findUnique({ where: { id: req.params.id } });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ product });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST /api/products — create (STAFF/ADMIN)
router.post('/', authenticate, authorize('STAFF', 'ADMIN'), async (req, res) => {
    try {
        const { name, nameHi, brand, category, subcategory, price, mrp, unit, image, description, stock, rating } = req.body;
        if (!name || !brand || !category || !subcategory || !price || !mrp || !unit) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const product = await prisma.product.create({
            data: { name, nameHi, brand, category, subcategory, price: parseFloat(price), mrp: parseFloat(mrp), unit, image: image || '', description, stock: parseInt(stock) || 100, rating: parseFloat(rating) || 4.0 },
        });
        res.status(201).json({ product });
    } catch (err) {
        console.error('Product create error:', err);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT /api/products/:id — update (STAFF/ADMIN)
router.put('/:id', authenticate, authorize('STAFF', 'ADMIN'), async (req, res) => {
    try {
        const data = {};
        const fields = ['name', 'nameHi', 'brand', 'category', 'subcategory', 'unit', 'image', 'description'];
        fields.forEach(f => { if (req.body[f] !== undefined) data[f] = req.body[f]; });
        ['price', 'mrp', 'rating'].forEach(f => { if (req.body[f] !== undefined) data[f] = parseFloat(req.body[f]); });
        ['stock', 'reviews'].forEach(f => { if (req.body[f] !== undefined) data[f] = parseInt(req.body[f]); });
        if (req.body.isActive !== undefined) data.isActive = Boolean(req.body.isActive);

        const product = await prisma.product.update({ where: { id: req.params.id }, data });
        res.json({ product });
    } catch (err) {
        console.error('Product update error:', err);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE /api/products/:id — soft delete (ADMIN only)
router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
    try {
        await prisma.product.update({ where: { id: req.params.id }, data: { isActive: false } });
        res.json({ message: 'Product deactivated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// PATCH /api/products/:id/stock — quick stock update (STAFF/ADMIN)
router.patch('/:id/stock', authenticate, authorize('STAFF', 'ADMIN'), async (req, res) => {
    try {
        const { stock } = req.body;
        const product = await prisma.product.update({ where: { id: req.params.id }, data: { stock: parseInt(stock) } });
        res.json({ product });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update stock' });
    }
});

export default router;
