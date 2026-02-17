export const categories = [
  {
    id: 'groceries',
    name: 'Groceries',
    nameHi: 'किराना',
    icon: '🛒',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    subcategories: [
      { id: 'rice-flour', name: 'Rice & Flour', nameHi: 'चावल और आटा' },
      { id: 'pulses', name: 'Pulses & Lentils', nameHi: 'दालें' },
      { id: 'oils', name: 'Cooking Oils', nameHi: 'खाना पकाने का तेल' },
      { id: 'spices', name: 'Spices & Masala', nameHi: 'मसाले' },
      { id: 'snacks', name: 'Snacks & Namkeen', nameHi: 'नमकीन और स्नैक्स' },
      { id: 'dairy', name: 'Dairy Products', nameHi: 'डेयरी उत्पाद' },
      { id: 'beverages', name: 'Beverages', nameHi: 'पेय पदार्थ' },
      { id: 'household', name: 'Household Essentials', nameHi: 'घरेलू ज़रूरतें' },
    ],
  },
  {
    id: 'utensils',
    name: 'Kitchen Utensils',
    nameHi: 'बर्तन',
    icon: '🍳',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    subcategories: [
      { id: 'steel', name: 'Steel Utensils', nameHi: 'स्टील के बर्तन' },
      { id: 'cookware', name: 'Cookware', nameHi: 'कुकवेयर' },
      { id: 'storage', name: 'Storage Containers', nameHi: 'स्टोरेज कंटेनर' },
      { id: 'appliances', name: 'Small Appliances', nameHi: 'छोटे उपकरण' },
    ],
  },
];

export const getCategoryById = (id) => categories.find((c) => c.id === id);

export const getSubcategoryById = (catId, subId) => {
  const cat = getCategoryById(catId);
  return cat?.subcategories.find((s) => s.id === subId);
};
