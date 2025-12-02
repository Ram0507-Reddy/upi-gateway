const auth = require('./middleware/auth');

// Mock Express objects
const mockRes = () => {
    const res = {};
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.body = data;
        return res;
    };
    return res;
};

const runTest = (description, apiKeyEnv, reqHeaderKey, expectedStatus) => {
    console.log(`Test: ${description}`);
    process.env.API_KEY = apiKeyEnv;

    const req = {
        header: (name) => name === 'x-api-key' ? reqHeaderKey : null
    };
    const res = mockRes();
    const next = () => {
        res.statusCode = 200; // Success
    };

    auth(req, res, next);

    if (res.statusCode === expectedStatus) {
        console.log('  PASS');
    } else {
        console.error(`  FAIL: Expected ${expectedStatus}, got ${res.statusCode}`);
        if (res.body) console.log('  Response:', res.body);
    }
    console.log('---');
};

// Run tests
console.log('Running Auth Middleware Tests...\n');

runTest('Single valid key', 'secret123', 'secret123', 200);
runTest('Multiple valid keys - Match first', 'key1,key2,key3', 'key1', 200);
runTest('Multiple valid keys - Match middle', 'key1,key2,key3', 'key2', 200);
runTest('Multiple valid keys - Match last', 'key1,key2,key3', 'key3', 200);
runTest('Multiple valid keys with spaces', 'key1, key2 , key3', 'key2', 200);
runTest('Invalid key', 'key1,key2', 'wrongkey', 401);
runTest('Missing key', 'key1,key2', undefined, 401);
runTest('Empty env var', '', 'anykey', 401);
