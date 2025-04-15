const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/user_play_records/:user_id
router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await pool.query(
            `SELECT id, category, selected_answers, created_at 
       FROM user_play_records 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
            [user_id]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('기록 조회 실패:', error);
        res.status(500).send(`(서버 에러) ${error.message}`);
    }
});

module.exports = router;
