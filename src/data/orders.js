export const orders = [
    { id: 'ORD-1001', customer: 'Ravi Sharma', phone: '98765XXXXX', items: [{ productId: 1, name: 'Basmati Rice', qty: 2, price: 185 }, { productId: 5, name: 'Toor Dal', qty: 1, price: 145 }, { productId: 12, name: 'Haldi Powder', qty: 2, price: 45 }], total: 605, status: 'delivered', payment: 'UPI', date: '2026-02-17', address: '12, Shanti Nagar, Near Temple', deliveryType: 'home', timeSlot: '10:00 AM - 12:00 PM' },
    { id: 'ORD-1002', customer: 'Priya Verma', phone: '87654XXXXX', items: [{ productId: 31, name: 'Non-Stick Tawa', qty: 1, price: 599 }, { productId: 35, name: 'Masala Box', qty: 1, price: 299 }], total: 898, status: 'packed', payment: 'Card', date: '2026-02-17', address: '45, MG Road, Block B', deliveryType: 'home', timeSlot: '2:00 PM - 4:00 PM' },
    { id: 'ORD-1003', customer: 'Amit Patel', phone: '76543XXXXX', items: [{ productId: 2, name: 'Wheat Flour', qty: 5, price: 55 }, { productId: 9, name: 'Mustard Oil', qty: 2, price: 180 }, { productId: 14, name: 'Garam Masala', qty: 3, price: 85 }], total: 890, status: 'packing', payment: 'COD', date: '2026-02-17', address: '78, Civil Lines', deliveryType: 'home', timeSlot: '4:00 PM - 6:00 PM' },
    { id: 'ORD-1004', customer: 'Sunita Devi', phone: '65432XXXXX', items: [{ productId: 22, name: 'Taj Mahal Tea', qty: 2, price: 145 }, { productId: 19, name: 'Amul Butter', qty: 3, price: 56 }], total: 458, status: 'new', payment: 'UPI', date: '2026-02-17', address: '', deliveryType: 'pickup', timeSlot: '11:00 AM' },
    { id: 'ORD-1005', customer: 'Vikram Singh', phone: '54321XXXXX', items: [{ productId: 32, name: 'Pressure Cooker 3L', qty: 1, price: 1250 }, { productId: 30, name: 'Serving Spoon Set', qty: 1, price: 180 }], total: 1430, status: 'dispatched', payment: 'Card', date: '2026-02-16', address: '23, Rajpur Road', deliveryType: 'home', timeSlot: '10:00 AM - 12:00 PM' },
    { id: 'ORD-1006', customer: 'Meena Kumari', phone: '43210XXXXX', items: [{ productId: 36, name: 'Mixer Grinder', qty: 1, price: 2499 }], total: 2499, status: 'delivered', payment: 'UPI', date: '2026-02-16', address: '56, Nehru Colony', deliveryType: 'home', timeSlot: '2:00 PM - 4:00 PM' },
    { id: 'ORD-1007', customer: 'Rahul Gupta', phone: '32109XXXXX', items: [{ productId: 16, name: 'Aloo Bhujia', qty: 3, price: 60 }, { productId: 17, name: 'Namkeen Mix', qty: 2, price: 55 }, { productId: 18, name: 'Monaco', qty: 4, price: 30 }], total: 410, status: 'new', payment: 'COD', date: '2026-02-17', address: '89, Gandhi Nagar', deliveryType: 'home', timeSlot: '6:00 PM - 8:00 PM' },
    { id: 'ORD-1008', customer: 'Anjali Mishra', phone: '21098XXXXX', items: [{ productId: 34, name: 'Container Set', qty: 1, price: 399 }, { productId: 28, name: 'Thali Set', qty: 2, price: 450 }], total: 1299, status: 'delivered', payment: 'Wallet', date: '2026-02-15', address: '34, Sadar Bazar', deliveryType: 'home', timeSlot: '10:00 AM - 12:00 PM' },
    { id: 'ORD-1009', customer: 'Deepak Kumar', phone: '10987XXXXX', items: [{ productId: 6, name: 'Moong Dal', qty: 2, price: 130 }, { productId: 7, name: 'Chana Dal', qty: 1, price: 95 }, { productId: 8, name: 'Rajma', qty: 1, price: 160 }], total: 515, status: 'packing', payment: 'UPI', date: '2026-02-17', address: '67, Lal Bagh', deliveryType: 'home', timeSlot: '12:00 PM - 2:00 PM' },
    { id: 'ORD-1010', customer: 'Pooja Yadav', phone: '09876XXXXX', items: [{ productId: 23, name: 'Nescafe Coffee', qty: 1, price: 195 }, { productId: 24, name: 'Bournvita', qty: 1, price: 210 }, { productId: 20, name: 'Paneer', qty: 2, price: 90 }], total: 585, status: 'new', payment: 'COD', date: '2026-02-17', address: '', deliveryType: 'pickup', timeSlot: '3:00 PM' },
    { id: 'ORD-1011', customer: 'Manish Tiwari', phone: '98760XXXXX', items: [{ productId: 37, name: 'Electric Kettle', qty: 1, price: 699 }], total: 699, status: 'delivered', payment: 'UPI', date: '2026-02-14', address: '12, Station Road', deliveryType: 'home', timeSlot: '10:00 AM - 12:00 PM' },
    { id: 'ORD-1012', customer: 'Kavita Joshi', phone: '87650XXXXX', items: [{ productId: 25, name: 'Vim Bar', qty: 5, price: 30 }, { productId: 26, name: 'Surf Excel', qty: 2, price: 120 }, { productId: 27, name: 'Lizol', qty: 1, price: 110 }], total: 500, status: 'delivered', payment: 'Card', date: '2026-02-13', address: '90, Kamla Nagar', deliveryType: 'home', timeSlot: '4:00 PM - 6:00 PM' },
];

export const getOrderById = (id) => orders.find((o) => o.id === id);

export const getOrdersByStatus = (status) => orders.filter((o) => o.status === status);

export const orderStatuses = ['new', 'packing', 'packed', 'dispatched', 'delivered'];

export const statusLabels = {
    new: 'New Order',
    packing: 'Packing',
    packed: 'Packed',
    dispatched: 'Out for Delivery',
    delivered: 'Delivered',
};

export const statusColors = {
    new: '#f59e0b',
    packing: '#3b82f6',
    packed: '#8b5cf6',
    dispatched: '#06b6d4',
    delivered: '#10b981',
};
