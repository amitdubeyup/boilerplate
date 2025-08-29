const db = require('../../db');
const User = require('../../models/User/User');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.createUser = async (req, res) => {
  const { username, email, hashed_password, is_active, role, last_login, profile_picture, phone_number } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO users (username, email, hashed_password, is_active, role, last_login, profile_picture, phone_number, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *`,
      [username, email, hashed_password, is_active ?? true, role ?? 'user', last_login, profile_picture, phone_number]
    );
    const user = new User(result.rows[0]);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
  const users = result.rows.map(row => new User(row));
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
  const user = new User(result.rows[0]);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { username, email, hashed_password, is_active, role, last_login, profile_picture, phone_number } = req.body;
  try {
    const result = await db.query(
      `UPDATE users SET username = $1, email = $2, hashed_password = $3, is_active = $4, role = $5, last_login = $6, profile_picture = $7, phone_number = $8, updated_at = NOW() WHERE id = $9 RETURNING *`,
      [username, email, hashed_password, is_active, role, last_login, profile_picture, phone_number, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    const user = new User(result.rows[0]);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, hashed_password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1 AND hashed_password = $2', [email, hashed_password]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
  const user = result.rows[0];
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
  res.json({ token, user: new User(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
