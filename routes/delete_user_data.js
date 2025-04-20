const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).send('user_id가 누락되었습니다.');
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. 플레이 기록 삭제
        await client.query(
            `DELETE FROM user_play_records WHERE user_id = $1`,
            [user_id]
        );

        // 2. 성향 카운트 삭제
        await client.query(
            `DELETE FROM user_type_counts WHERE user_id = $1`,
            [user_id]
        );

        await client.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('기록 삭제 실패:', error);
        res.status(500).send(`(서버 에러) ${error.message}`);
    } finally {
        client.release();
    }
});

module.exports = router;
