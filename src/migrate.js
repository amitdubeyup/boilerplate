const db = require('./db');

async function migrate() {
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    role VARCHAR(50) DEFAULT 'user',
    last_login TIMESTAMPTZ,
    profile_picture VARCHAR(255),
    phone_number VARCHAR(20),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`);

  await db.query(`CREATE TABLE IF NOT EXISTS passbooks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(10) NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    balance NUMERIC(12,2) NOT NULL,
    description TEXT,
    transaction_id VARCHAR(100),
    status VARCHAR(20) DEFAULT 'completed',
    category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`);

  console.log('Migration complete.');
  process.exit();
}

migrate();
