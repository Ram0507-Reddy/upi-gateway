import React from 'react';
import ProductCard from './ProductCard';

const PRODUCTS = [
    {
        id: 1,
        name: "Sony WH-1000XM5",
        price: 1,
        description: "Industry-leading noise canceling headphones with Auto NC Optimizer.",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=500"
    },
    {
        id: 2,
        name: "Keychron K2 Pro",
        price: 1,
        description: "Wireless mechanical keyboard with QMK/VIA support.",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=500"
    },
    {
        id: 3,
        name: "Logitech MX Master 3S",
        price: 1,
        description: "Performance wireless mouse with 8K DPI tracking.",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=500"
    },
    {
        id: 4,
        name: "Nothing Phone (2)",
        price: 1,
        description: "New Glyph Interface and 50 MP dual camera.",
        image: "https://images.unsplash.com/photo-1691434358786-291772921384?auto=format&fit=crop&q=80&w=500"
    },
    {
        id: 5,
        name: "Apple Watch Series 9",
        price: 1,
        description: "Smarter, brighter, and mightier. S9 SiP.",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=500"
    },
    {
        id: 6,
        name: "Kindle Paperwhite",
        price: 1,
        description: "Now with a 6.8” display and adjustable warm light.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500"
    }
];

const Store = ({ onAddToCart }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">TechGadget Store</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Premium electronics and accessories for your workspace.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default Store;
