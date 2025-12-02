const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const dotenv = require('dotenv');
const auth = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all origins for this demo
app.use(express.json());

// Routes
app.post('/api/v1/create-payment', auth, async (req, res) => {
    try {
        const { amount, orderId, note, merchantUpiId, merchantName } = req.body;

        if (!amount || !orderId) {
            return res.status(400).json({ success: false, message: 'Amount and Order ID are required' });
        }

        if (!merchantUpiId) {
            return res.status(400).json({ success: false, message: 'Merchant UPI ID is required' });
        }

        const payeeName = merchantName || 'Merchant';

        // Construct UPI Intent String
        // upi://pay?pa=...&pn=...&am=...&tr=...&tn=...
        const upiDeepLink = `upi://pay?pa=${merchantUpiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${orderId}&tn=${encodeURIComponent(note || 'Payment')}&cu=INR`;

        // Generate QR Code
        const qrImage = await QRCode.toDataURL(upiDeepLink);

        res.json({
            success: true,
            qrImage,
            upiDeepLink,
            amount,
            orderId,
            merchantVpa: merchantUpiId
        });

    } catch (error) {
        console.error('Error generating QR:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Health Check
app.get('/', (req, res) => {
    res.send('UPI Payment Gateway API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
