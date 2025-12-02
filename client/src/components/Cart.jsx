import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';

const Cart = ({ isOpen, onClose, cartItems, onRemoveFromCart, onCheckout }) => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

            <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
                <div className="h-full w-full bg-white shadow-xl flex flex-col animate-slide-in-right">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <ShoppingBag size={20} />
                            Your Cart
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                <ShoppingBag size={48} className="opacity-20" />
                                <p>Your cart is empty</p>
                                <button onClick={onClose} className="text-blue-600 font-medium hover:underline">
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-white" />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                                            <p className="text-gray-500 text-sm">₹{item.price.toLocaleString()}</p>
                                        </div>
                                        <button
                                            onClick={() => onRemoveFromCart(index)}
                                            className="text-red-400 hover:text-red-600 p-2 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">Total Amount</span>
                                <span className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={onCheckout}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                            >
                                Checkout Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
