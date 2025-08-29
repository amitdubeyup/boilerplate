const db = require('../../db');
const Passbook = require('../../models/Passbook/Passbook');

// Credit transaction
exports.credit = async (req, res) => {
  const userId = req.user.id;
  const { amount, description, transaction_id, status, category } = req.body;
  try {
    await db.query('BEGIN');
    const balanceResult = await db.query('SELECT balance FROM passbooks WHERE user_id = $1 ORDER BY id DESC LIMIT 1', [userId]);
    const prevBalance = balanceResult.rows[0]?.balance || 0;
    const newBalance = prevBalance + amount;
    const result = await db.query(
      `INSERT INTO passbooks (user_id, type, amount, balance, description, transaction_id, status, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [userId, 'credit', amount, newBalance, description, transaction_id, status ?? 'completed', category]
    );
    await db.query('COMMIT');
    const entry = result.rows[0];
    res.status(201).json(new Passbook(entry));
  } catch (err) {
    await db.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  }
};

// Debit transaction
exports.debit = async (req, res) => {
  const userId = req.user.id;
  const { amount, description, transaction_id, status, category } = req.body;
  try {
    await db.query('BEGIN');
    const balanceResult = await db.query('SELECT balance FROM passbooks WHERE user_id = $1 ORDER BY id DESC LIMIT 1', [userId]);
    const prevBalance = balanceResult.rows[0]?.balance || 0;
    if (prevBalance < amount) {
      await db.query('ROLLBACK');
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    const newBalance = prevBalance - amount;
    const result = await db.query(
      `INSERT INTO passbooks (user_id, type, amount, balance, description, transaction_id, status, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [userId, 'debit', amount, newBalance, description, transaction_id, status ?? 'completed', category]
    );
    await db.query('COMMIT');
    const entry = result.rows[0];
    res.status(201).json(new Passbook(entry));
  } catch (err) {
    await db.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  }
};

// Get passbook entries
exports.getPassbook = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await db.query('SELECT * FROM passbooks WHERE user_id = $1 ORDER BY id DESC', [userId]);
  const entries = result.rows.map(entry => new Passbook(entry));
  res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
