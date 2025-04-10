const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { user_id, category, selected_answers } = req.body;

    if (!user_id || !category || !selected_answers) {
        return res.status(400).json({ error: '�߸��� ��û�Դϴ�.' });
    }

    try {
        await pool.query(
            'INSERT INTO user_play_records (user_id, category, selected_answers, created_at) VALUES ($1, $2, $3, NOW())',
            [user_id, category, selected_answers]
        );
        res.status(200).json({ message: '��� ���� �Ϸ�' });
    } catch (error) {
        console.error('DB ���� ����:', error);
        res.status(500).json({ error: '���� ����' });
    }
});

module.exports = router;
