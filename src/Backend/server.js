const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sql = require('mssql');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// SQL Server config
const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '123',
  server: process.env.DB_SERVER || 'DESKTOP-6SDSPSO',
  database: process.env.DB_NAME || 'REACT',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

/* REGISTER API */
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('passwordHash', sql.VarChar, hashedPassword)
      .query(`
        INSERT INTO Users (Username, Email, PasswordHash)
        VALUES (@username, @email, @passwordHash)
      `);

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('❌ Register Error:', err);
    res.status(500).json({ error: 'Registration failed on server' });
  }
});

/*LOGIN API */
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Users WHERE Email = @email');

    if (result.recordset.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
