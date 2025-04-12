const express = require('express');
const router = express.Router();
const pool = require('../db');
const saveUserPlayRecord = require('../services/user_play_records');
const updateUserTypeCounts = require('../services/user_type_counts');

router.post('/', async (req, res) => {
    const { user_id, category, selected_answers, type_counts } = req.body;

    if (!user_id || !category || !selected_answers || !type_counts) {
        return res.status(400).send('요청 정보가 올바르지 않습니다.');
    }

    try {
        const recent = await pool.query(
            `SELECT * FROM user_play_records
       WHERE user_id = $1 AND category = $2 AND selected_answers = $3
       ORDER BY created_at DESC
       LIMIT 1`,
            [user_id, category, selected_answers]
        );

        if (recent.rows.length > 0) {
            const lastSaved = new Date(recent.rows[0].created_at);
            const now = new Date();
            const diffMinutes = (now - lastSaved) / 60000;

            if (diffMinutes < 5) {
                return res.status(409).send('방금 저장한 내용이에요. 잠시 후 다시 시도해주세요.');
            }
        }

        await saveUserPlayRecord(pool, user_id, category, selected_answers);
        await updateUserTypeCounts(pool, user_id, type_counts);

        res.status(200).send('기록 저장 완료');
    } catch (error) {
        console.error('저장 실패:', error);
        res.status(500).send('서버 에러');
    }
});

module.exports = router;
