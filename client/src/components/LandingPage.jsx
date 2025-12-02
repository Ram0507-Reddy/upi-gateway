import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Code, ArrowRight, Terminal } from 'lucide-react';
import KeyModal from './KeyModal';

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono selection:bg-green-900 selection:text-white">
            {/* Navbar */}
            <nav className="border-b border-green-900/50 backdrop-blur-md fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-8 h-8" />
                        <span className="text-xl font-bold tracking-tighter">ZeroPay_API</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#docs" className="hover:text-white transition-colors">Docs</a>
                        <Link to="/demo" className="bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-2 rounded-sm transition-all flex items-center gap-2">
                            View Demo <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-block border border-green-500/30 bg-green-500/10 px-4 py-1 rounded-full text-sm mb-6 animate-pulse">
                        v1.0.0 Stable Release
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                        Accept UPI Payments <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            with 0% Transaction Fees
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Direct-to-Bank settlements. No Middlemen. No holding periods.
                        The developer-first gateway you've been waiting for.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-sm text-lg transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                        >
                            Get API Key
                        </button>
                        <Link to="/demo" className="border border-green-500/50 hover:border-green-400 hover:bg-green-500/10 text-green-400 py-4 px-8 rounded-sm text-lg transition-all">
                            Live Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 bg-zinc-900/50 border-y border-green-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-10 h-10 mb-4" />,
                                title: "Dynamic QR Codes",
                                desc: "Generate unique QR codes for every transaction instantly."
                            },
                            {
                                icon: <Shield className="w-10 h-10 mb-4" />,
                                title: "Instant Settlement",
                                desc: "Money goes directly to your bank account via UPI. No wallet."
                            },
                            {
                                icon: <Code className="w-10 h-10 mb-4" />,
                                title: "Developer Friendly",
                                desc: "Simple REST API. Integrate in less than 5 minutes."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 border border-green-900/50 bg-black hover:border-green-500/50 transition-colors group">
                                <div className="text-green-500 group-hover:text-white transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documentation */}
            <section id="docs" className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                        <Terminal className="text-green-500" />
                        API Documentation
                    </h2>

                    <div className="space-y-8">
                        {/* Request */}
                        <div className="bg-zinc-900 rounded-lg overflow-hidden border border-gray-800">
                            <div className="bg-black px-4 py-2 border-b border-gray-800 flex items-center justify-between">
                                <span className="text-sm text-gray-400">Request</span>
                                <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">POST /api/v1/create-payment</span>
                            </div>
                            <div className="p-6 overflow-x-auto">
                                <pre className="text-sm">
                                    <code className="language-javascript">
                                        {`const response = await fetch('https://api.zeropay.com/v1/create-payment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'sk_live_123456'
  },
  body: JSON.stringify({
    amount: 499,
    orderId: 'ORD-001',
    note: 'Premium Plan'
  })
});`}
                                    </code>
                                </pre>
                            </div>
                        </div>

                        {/* Response */}
                        <div className="bg-zinc-900 rounded-lg overflow-hidden border border-gray-800">
                            <div className="bg-black px-4 py-2 border-b border-gray-800 flex items-center justify-between">
                                <span className="text-sm text-gray-400">Response</span>
                                <span className="text-xs text-green-500">200 OK</span>
                            </div>
                            <div className="p-6 overflow-x-auto">
                                <pre className="text-sm">
                                    <code className="language-json">
                                        {`{
  "success": true,
  "qrImage": "data:image/png;base64,iVBORw0KGgo...",
  "upiDeepLink": "upi://pay?pa=merchant@upi&pn=Merchant&am=499...",
  "amount": 499,
  "orderId": "ORD-001"
}`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 text-center text-gray-600 border-t border-green-900/30">
                <p>© 2025 ZeroPay API. Built for Developers.</p>
            </footer>

            <KeyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default LandingPage;
