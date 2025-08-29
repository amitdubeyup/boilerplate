import express from 'express';
import cors from './middlewares/cors';
import bodySize from './middlewares/bodySize';
import ddos from './middlewares/ddos';
import validation from './middlewares/validation';
import userRoutes from './routes/user';
import passbookRoutes from './routes/passbook';

const app = express();

app.use(express.json());
app.use(cors);
app.use(bodySize);
app.use(ddos);
app.use(validation);

// Request logging middleware
// Basic request logging middleware
app.use((req, _res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

app.use('/api/users', userRoutes);
app.use('/api/passbook', passbookRoutes);

app.get('/', (_req, res) => {
	res.send('Express + TypeScript API running');
});

// Global error handler
import { Request, Response, NextFunction } from 'express';

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error('Error:', err.message, err.stack);
	res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
// ...existing code...
