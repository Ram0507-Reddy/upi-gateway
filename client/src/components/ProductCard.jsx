import React from 'react';
import { Plus } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-48 bg-gray-100 relative overflow-hidden group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="bg-gray-900 hover:bg-black text-white p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium px-4"
                    >
                        <Plus size={16} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
