import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/authenticateJWT';
import db from '../../db';
import { Passbook } from '../../models/Passbook/Passbook';

export const creditPassbook = async (req: AuthenticatedRequest, res: Response) => {
	const userId = req.user.id;
	const { amount, description, transaction_id, status, category } = req.body;
	try {
		// Get current balance
		const balRes = await db.query('SELECT balance FROM passbooks WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1', [userId]);
		const prevBalance = balRes.rows[0]?.balance || 0;
		const newBalance = prevBalance + amount;
		const result = await db.query(
			`INSERT INTO passbooks (user_id, type, amount, balance, description, transaction_id, status, category, created_at)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *`,
			[userId, 'credit', amount, newBalance, description, transaction_id, status ?? 'completed', category]
		);
		res.status(201).json(new Passbook(result.rows[0]));
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const debitPassbook = async (req: AuthenticatedRequest, res: Response) => {
	const userId = req.user.id;
	const { amount, description, transaction_id, status, category } = req.body;
	try {
		// Get current balance
		const balRes = await db.query('SELECT balance FROM passbooks WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1', [userId]);
		const prevBalance = balRes.rows[0]?.balance || 0;
		if (prevBalance < amount) return res.status(400).json({ error: 'Insufficient balance' });
		const newBalance = prevBalance - amount;
		const result = await db.query(
			`INSERT INTO passbooks (user_id, type, amount, balance, description, transaction_id, status, category, created_at)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *`,
			[userId, 'debit', amount, newBalance, description, transaction_id, status ?? 'completed', category]
		);
		res.status(201).json(new Passbook(result.rows[0]));
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const getPassbook = async (req: AuthenticatedRequest, res: Response) => {
	const userId = req.user.id;
	try {
		const result = await db.query('SELECT * FROM passbooks WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
		const passbooks = result.rows.map((row: any) => new Passbook(row));
		res.json(passbooks);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
// ...existing code...
