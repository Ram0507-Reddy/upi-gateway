import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Store from './components/Store';
import Cart from './components/Cart';
import PaymentGateway from './components/PaymentGateway';
import LandingPage from './components/LandingPage';

// Wrapper component for the Store Demo to handle Cart state
const DemoStore = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    const addToCart = (product) => {
        setCart([...cart, product]);
        setIsCartOpen(true);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const handleCheckout = () => {
        const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
        if (totalAmount === 0) return;

        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        setCurrentOrder({
            amount: totalAmount,
            orderId: orderId,
            apiKey: import.meta.env.VITE_DEMO_API_KEY || 'sk_test_1234567890',
            merchantUpiId: 'shriramreddyofficial0507@oksbi',
            merchantName: 'ZeroPay Demo Store'
        });

        setIsCartOpen(false);
        setShowPayment(true);
    };

    const handlePaymentSuccess = (utr) => {
        console.log('Payment Verified with UTR:', utr);
        setPaymentSuccess(true);
        setShowPayment(false);
        setCart([]); // Clear cart
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            {/* Demo Navbar */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-gray-500 hover:text-gray-900">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                T
                            </div>
                            <span className="text-xl font-bold text-gray-900">TechGadget</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ShoppingCart size={24} />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {!showPayment && !paymentSuccess && (
                    <Store onAddToCart={addToCart} />
                )}

                {/* Payment Gateway Modal */}
                {showPayment && currentOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
                        <div className="w-full max-w-md">
                            <button
                                onClick={() => setShowPayment(false)}
                                className="mb-4 text-white hover:text-gray-200 text-sm font-medium flex items-center gap-1"
                            >
                                ← Cancel Payment
                            </button>
                            <PaymentGateway
                                amount={currentOrder.amount}
                                orderId={currentOrder.orderId}
                                apiKey={currentOrder.apiKey}
                                merchantUpiId={currentOrder.merchantUpiId}
                                merchantName={currentOrder.merchantName}
                                onSuccess={handlePaymentSuccess}
                            />
                        </div>
                    </div>
                )}

                {/* Success Screen */}
                {paymentSuccess && (
                    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 animate-scale-in">
                        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
                            <p className="text-gray-500 mb-6">
                                Thank you for your purchase. Your order has been confirmed.
                            </p>
                            <button
                                onClick={() => setPaymentSuccess(false)}
                                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-all"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Cart Sidebar */}
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                onRemoveFromCart={removeFromCart}
                onCheckout={handleCheckout}
            />
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/demo" element={<DemoStore />} />
            </Routes>
        </Router>
    );
}

export default App;
