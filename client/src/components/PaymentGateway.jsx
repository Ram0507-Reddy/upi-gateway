import React, { useState, useEffect } from 'react';
import { Copy, Check, Smartphone, Monitor, ShieldCheck } from 'lucide-react';

const PaymentGateway = ({ amount, orderId, apiKey, merchantUpiId, merchantName, onSuccess }) => {
    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);
    const [utr, setUtr] = useState('');
    const [copied, setCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const API_BASE = envUrl.startsWith('http') ? envUrl : `https://${envUrl}`;

                const response = await fetch(`${API_BASE}/api/v1/create-payment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                    },
                    body: JSON.stringify({
                        amount,
                        orderId,
                        merchantUpiId,
                        merchantName,
                        note: `Order #${orderId}`
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to initialize payment');
                }

                const data = await response.json();
                setPaymentData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (amount && orderId && apiKey) {
            fetchPaymentDetails();
        }
    }, [amount, orderId, apiKey, merchantUpiId]);

    const handleCopy = () => {
        if (paymentData?.merchantVpa) {
            navigator.clipboard.writeText(paymentData.merchantVpa);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleVerify = () => {
        if (utr.length < 12) {
            alert('Please enter a valid 12-digit UTR/Reference Number');
            return;
        }
        // In a real app, you would verify this UTR with your bank API
        onSuccess(utr);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-md mx-auto h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100 w-full max-w-md mx-auto text-center">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto overflow-hidden font-inter">
            {/* Header */}
            <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Pay via UPI</h2>
                    <p className="text-sm text-gray-500">Order #{orderId}</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">₹{amount}</p>
                </div>
            </div>

            <div className="p-8 flex flex-col items-center">
                {/* QR Code Section */}
                {!isMobile ? (
                    <div className="relative group">
                        <div className="p-4 bg-white border-2 border-blue-100 rounded-xl shadow-sm">
                            <img
                                src={paymentData?.qrImage}
                                alt="UPI QR Code"
                                className="w-48 h-48 object-contain"
                            />
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Monitor size={16} />
                            <span>Scan with any UPI App</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        <a
                            href={paymentData?.upiDeepLink}
                            className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-blue-200"
                        >
                            <Smartphone size={24} />
                            Pay on UPI App
                        </a>
                        <p className="mt-3 text-center text-xs text-gray-400">Tap to open GPay, PhonePe, Paytm, etc.</p>
                    </div>
                )}

                {/* UPI ID Display */}
                <div className="mt-8 w-full">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-sm font-mono text-gray-600 truncate mr-2">
                            {paymentData?.merchantVpa}
                        </span>
                        <button
                            onClick={handleCopy}
                            className="text-blue-600 hover:text-blue-700 transition-colors p-1"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>

                {/* Verification Section */}
                <div className="mt-8 w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Payment Verification
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter 12-digit UTR / Ref No."
                            value={utr}
                            onChange={(e) => setUtr(e.target.value)}
                            className="w-full pl-4 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700 placeholder-gray-400"
                            maxLength={12}
                        />
                        <div className="absolute right-3 top-3 text-gray-400">
                            <ShieldCheck size={20} />
                        </div>
                    </div>
                    <button
                        onClick={handleVerify}
                        className="mt-4 w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                        Verify Payment
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <ShieldCheck size={12} />
                    Secured by DIY Gateway
                </p>
            </div>
        </div>
    );
};

export default PaymentGateway;
