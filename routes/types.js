const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/types
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT name FROM types');
        const types = result.rows.map((row) => row.name);
        res.json(types);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 에러' });
    }
});

module.exports = router;
