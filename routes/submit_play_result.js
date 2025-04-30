const express = require('express');
const router = express.Router();
const pool = require('../db');
const saveUserPlayRecord = require('../services/save_user_play_record');
const updateUserTypeCounts = require('../services/update_user_type_counts');

router.post('/', async (req, res) => {
    const { user_id, category, selected_answers, type_counts } = req.body;

    if (!user_id || !category || !selected_answers || !type_counts) {
        return res.status(400).send('요청 정보가 올바르지 않습니다.');
    }

    const selectedAnswersJson = JSON.stringify(selected_answers);

    try {
        const recent = await pool.query(
            `SELECT * FROM user_play_records
       WHERE user_id = $1 AND category = $2 AND selected_answers::jsonb = $3::jsonb
       ORDER BY created_at DESC
       LIMIT 1`,
            [user_id, category, selectedAnswersJson]
        );

        if (recent.rows.length > 0) {
            const lastSaved = new Date(recent.rows[0].created_at);
            const now = new Date();
            const diffMinutes = (now - lastSaved) / 60000;

            if (diffMinutes < 5) {
                return res.status(409).send('방금 저장한 내용이에요. 잠시 후 다시 시도해주세요.');
            }
        }

        await saveUserPlayRecord(pool, user_id, category, selectedAnswersJson);
        await updateUserTypeCounts(pool, user_id, type_counts);

        res.sendStatus(200);
    } catch (error) {
        console.error('저장 실패:', error);
        res.status(500).send(`(서버 에러) ${error.message}`);
    }
});

module.exports = router;
