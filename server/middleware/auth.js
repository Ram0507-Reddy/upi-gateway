const dotenv = require('dotenv');
dotenv.config();

const auth = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or missing API Key' });
    }

    next();
};

module.exports = auth;
