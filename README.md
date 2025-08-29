
# Boilerplate - Express + PostgreSQL API

## Overview
A secure, scalable backend using Express and PostgreSQL. Supports flexible user and passbook management with JWT authentication and robust validation.

## Features
- User and Passbook CRUD
- JWT authentication for protected endpoints
- Validation, rate limiting, CORS, and body size protection
- Scalable, modular codebase

## Database Schema

### users
- id SERIAL PRIMARY KEY
- username VARCHAR(255) NOT NULL
- email VARCHAR(255) NOT NULL UNIQUE
- hashed_password VARCHAR(255) NOT NULL
- is_active BOOLEAN DEFAULT true
- role VARCHAR(50) DEFAULT 'user'
- last_login TIMESTAMPTZ
- profile_picture VARCHAR(255)
- phone_number VARCHAR(20)
- updated_at TIMESTAMPTZ DEFAULT NOW()
- created_at TIMESTAMPTZ DEFAULT NOW()

### passbooks
- id SERIAL PRIMARY KEY
- user_id INTEGER REFERENCES users(id)
- type VARCHAR(10) NOT NULL
- amount NUMERIC(12,2) NOT NULL
- balance NUMERIC(12,2) NOT NULL
- description TEXT
- transaction_id VARCHAR(100)
- status VARCHAR(20) DEFAULT 'completed'
- category VARCHAR(50)
- created_at TIMESTAMPTZ DEFAULT NOW()

## Setup

### 1. Clone & Install
```sh
npm install
```

### 2. Configure Environment
Create a `.env` file:
```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
```

### 3. Run Migration
Creates all tables.
```sh
npm run migrate
```

### 4. Start Server
```sh
npm start
```

## API Endpoints

### Auth
- `POST /api/users/login` (returns JWT)

### Users
- `POST /api/users` (register)
- `GET /api/users` (JWT required)
- `GET /api/users/:id` (JWT required)
- `PUT /api/users/:id` (JWT required)
- `DELETE /api/users/:id` (JWT required)

#### User JSON Example
```json
{
  "username": "amitdubeyup",
  "email": "amitdubey8888@gmail.com",
  "hashed_password": "your_hash",
  "is_active": true,
  "role": "user",
  "profile_picture": "url",
  "phone_number": "1234567890"
}
```

### Passbook
- `POST /api/passbook/credit` (JWT required)
- `POST /api/passbook/debit` (JWT required)
- `GET /api/passbook` (JWT required)

#### Passbook JSON Example
```json
{
  "amount": 100.00,
  "description": "Deposit",
  "transaction_id": "TXN123",
  "status": "completed",
  "category": "deposit"
}
```

## Security & Scalability
- JWT authentication
- Input validation
- Rate limiting & body size limits
- CORS
- PostgreSQL for scalable data

## Testing
Use [Postman](https://www.postman.com/) or `curl` to test endpoints. Include JWT in `Authorization` header for protected routes.

## Author
[Amit Dubey](https://github.com/amitdubeyup)

## License
MIT
