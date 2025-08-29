
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const passbookRoutes = require('./routes/passbook');
const corsMiddleware = require('./middlewares/cors');
const ddosMiddleware = require('./middlewares/ddos');
const bodySizeMiddleware = require('./middlewares/bodySize');
const { userValidationRules, validate } = require('./middlewares/validation');
const config = require('./config');


const app = express();
app.use(corsMiddleware);
app.use(ddosMiddleware);
app.use(bodySizeMiddleware);

// Apply validation middleware for user routes (using index.js from routes/user)
app.use('/api/users', userRoutes);
app.use('/api/passbook', passbookRoutes);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
