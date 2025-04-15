const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/types
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT name FROM types');
        const types = result.rows.map((row) => row.name);
        res.status(200).json(types);
    } catch (error) {
        console.error(error);
        res.status(500).send(`(서버 에러) ${error.message}`);
    }
});

module.exports = router;
