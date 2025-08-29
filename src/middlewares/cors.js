// CORS middleware
const cors = require('cors');
module.exports = cors({
  origin: '*', // Adjust for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
