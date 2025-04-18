﻿const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/questions
router.get('/', async (req, res) => {
    try {
        // 모든 질문 조회
        const questionResult = await pool.query('SELECT * FROM questions');

        // 질문마다 옵션 붙이기
        const questionsWithOptions = await Promise.all(
            questionResult.rows.map(async (q) => {
                const optionsResult = await pool.query(
                    'SELECT text, type FROM options WHERE question_id = $1',
                    [q.id]
                );

                return {
                    category: q.category,
                    question: q.question,
                    options: optionsResult.rows,
                };
            })
        );

        res.status(200).json(questionsWithOptions);
    } catch (error) {
        console.error(error);
        res.status(500).send(`(서버 에러) ${error.message}`);
    }
});

module.exports = router;
