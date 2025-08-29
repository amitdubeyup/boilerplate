// Middleware to limit request body size
module.exports = require('body-parser').json({ limit: '100kb' });
