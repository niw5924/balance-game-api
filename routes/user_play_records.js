const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { user_id, category, selected_answers } = req.body;

    if (!user_id || !category || !selected_answers) {
        return res.status(400).json({ error: '잘못된 요청입니다.' });
    }

    try {
        await pool.query(
            'INSERT INTO user_play_records (user_id, category, selected_answers, created_at) VALUES ($1, $2, $3, NOW())',
            [user_id, category, selected_answers]
        );
        res.status(200).json({ message: '기록 저장 완료' });
    } catch (error) {
        console.error('DB 저장 실패:', error);
        res.status(500).json({ error: '서버 에러' });
    }
});

module.exports = router;
