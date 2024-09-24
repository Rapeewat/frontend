const express = require('express');
const bcrypt = require('bcryptjs');
const { poolPromise } = require('./db');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Signup API
app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const pool = await poolPromise;

        // ตรวจสอบว่า username มีอยู่แล้วหรือไม่
        const result = await pool.request().query(`SELECT * FROM Users WHERE username = '${username}'`);
        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // บันทึกข้อมูลลงในฐานข้อมูล
        await pool.request().query(`INSERT INTO Users (username, password) VALUES ('${username}', '${hashedPassword}')`);
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login API
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const pool = await poolPromise;

        // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const result = await pool.request().query(`SELECT * FROM Users WHERE username = '${username}'`);
        const user = result.recordset[0];

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
