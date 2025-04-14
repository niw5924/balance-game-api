const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM user_type_counts WHERE user_id = $1',
            [user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('해당 사용자의 데이터가 없습니다.');
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('유형 조회 실패:', error);
        res.status(500).send('서버 에러');
    }
});

module.exports = router;
