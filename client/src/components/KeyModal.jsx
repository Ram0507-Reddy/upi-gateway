import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Loader2, Terminal } from 'lucide-react';

const KeyModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('input'); // input, loading, success
    const [formData, setFormData] = useState({ name: '', project: '' });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setStep('input');
            setFormData({ name: '', project: '' });
            setCopied(false);
        }
    }, [isOpen]);

    const handleGenerate = (e) => {
        e.preventDefault();
        setStep('loading');
        setTimeout(() => {
            setStep('success');
        }, 1500);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText('sk_test_demo_2025');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-zinc-900 border border-green-500/30 rounded-lg w-full max-w-md p-6 shadow-[0_0_50px_rgba(34,197,94,0.15)] animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {step === 'input' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 mb-4">
                                <Terminal className="w-6 h-6 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Get your API Key</h2>
                            <p className="text-gray-400 text-sm">Start integrating ZeroPay in seconds.</p>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Developer Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                                    placeholder="e.g. Alex Chen"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                                    placeholder="e.g. E-commerce App"
                                    value={formData.project}
                                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 rounded transition-all flex items-center justify-center gap-2"
                            >
                                Generate Key
                            </button>
                        </form>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="py-12 text-center space-y-4">
                        <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto" />
                        <p className="text-green-400 font-mono animate-pulse">Provisioning Sandbox Environment...</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="space-y-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-2">
                            <Check className="w-8 h-8 text-green-500" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">You're all set!</h2>
                            <p className="text-gray-400 text-sm">Here is your test API key.</p>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4 flex items-center justify-between gap-3 group">
                            <code className="text-green-400 font-mono text-lg">sk_test_demo_2025</code>
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-zinc-800 rounded transition-colors text-gray-400 hover:text-white relative"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500">
                            This key is for testing purposes only.
                        </p>

                        <button
                            onClick={onClose}
                            className="w-full border border-gray-700 hover:border-gray-500 text-white font-medium py-3 rounded transition-all"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeyModal;
