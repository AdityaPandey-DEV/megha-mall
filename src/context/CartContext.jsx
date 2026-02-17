import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
                    ),
                };
            }
            return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
        }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
        case 'UPDATE_QTY':
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.payload.id ? { ...i, qty: Math.max(1, action.payload.qty) } : i
                ),
            };
        case 'APPLY_COUPON':
            return { ...state, coupon: action.payload };
        case 'REMOVE_COUPON':
            return { ...state, coupon: null };
        case 'CLEAR_CART':
            return { ...state, items: [], coupon: null };
        default:
            return state;
    }
};

const coupons = {
    WELCOME100: { type: 'flat', value: 100, minOrder: 300, label: '₹100 off' },
    SAVE10: { type: 'percent', value: 10, maxDiscount: 200, minOrder: 500, label: '10% off up to ₹200' },
    FREEDELIVERY: { type: 'delivery', value: 0, minOrder: 500, label: 'Free delivery' },
    UTENSIL15: { type: 'percent', value: 15, maxDiscount: 300, minOrder: 800, label: '15% off utensils', category: 'utensils' },
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [], coupon: null });

    const addItem = useCallback((product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    }, []);

    const removeItem = useCallback((id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    }, []);

    const updateQty = useCallback((id, qty) => {
        dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
    }, []);

    const applyCoupon = useCallback((code) => {
        const coupon = coupons[code.toUpperCase()];
        if (!coupon) return { success: false, message: 'Invalid coupon code' };
        const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
        if (subtotal < coupon.minOrder) return { success: false, message: `Minimum order ₹${coupon.minOrder}` };
        dispatch({ type: 'APPLY_COUPON', payload: { code: code.toUpperCase(), ...coupon } });
        return { success: true, message: `Coupon applied: ${coupon.label}` };
    }, [state.items]);

    const removeCoupon = useCallback(() => {
        dispatch({ type: 'REMOVE_COUPON' });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    let discount = 0;
    if (state.coupon) {
        if (state.coupon.type === 'flat') discount = state.coupon.value;
        if (state.coupon.type === 'percent') discount = Math.min((subtotal * state.coupon.value) / 100, state.coupon.maxDiscount || Infinity);
    }

    const deliveryFee = state.coupon?.type === 'delivery' ? 0 : subtotal >= 500 ? 0 : 40;
    const total = Math.max(0, subtotal - discount + deliveryFee);

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                coupon: state.coupon,
                addItem,
                removeItem,
                updateQty,
                applyCoupon,
                removeCoupon,
                clearCart,
                subtotal,
                discount,
                deliveryFee,
                total,
                itemCount: state.items.reduce((sum, i) => sum + i.qty, 0),
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
