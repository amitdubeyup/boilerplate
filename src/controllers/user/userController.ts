
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../db';
import { User } from '../../models/User/User';

const secret = process.env.JWT_SECRET as string;

export const createUser = async (req: Request, res: Response) => {
	const { username, email, password, is_active, role, last_login, profile_picture, phone_number } = req.body;
	try {
		const hashed = await bcrypt.hash(password, 10);
		const result = await db.query(
			`INSERT INTO users (username, email, password, is_active, role, last_login, profile_picture, phone_number, updated_at)
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *`,
			[username, email, hashed, is_active ?? true, role ?? 'user', last_login, profile_picture, phone_number]
		);
		const user = new User(result.rows[0]);
		res.status(201).json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const result = await db.query('SELECT * FROM users');
		const users = result.rows.map((row: any) => new User(row));
		res.json(users);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
		if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
		const user = new User(result.rows[0]);
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { username, email, password, is_active, role, last_login, profile_picture, phone_number } = req.body;
	try {
		const hashed = password ? await bcrypt.hash(password, 10) : undefined;
		const result = await db.query(
			`UPDATE users SET username = $1, email = $2, password = COALESCE($3, password), is_active = $4, role = $5, last_login = $6, profile_picture = $7, phone_number = $8, updated_at = NOW() WHERE id = $9 RETURNING *`,
			[username, email, hashed, is_active, role, last_login, profile_picture, phone_number, req.params.id]
		);
		if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
		const user = new User(result.rows[0]);
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
		if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
		res.json({ message: 'User deleted' });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const login = async (req: Request, res: Response) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required.' });
		}
		try {
			const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
			if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
			const user = result.rows[0];
			if (!user.password || typeof user.password !== 'string') {
				return res.status(500).json({ error: 'User password is invalid.' });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) return res.status(401).json({ error: 'Invalid credentials' });
			const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
			res.json({ token, user: new User(user) });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	};
