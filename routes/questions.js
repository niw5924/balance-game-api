const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const questionResult = await pool.query(
            'SELECT * FROM questions WHERE category = $1 ORDER BY RANDOM() LIMIT 10',
            [category]
        );

        const questionsWithOptions = await Promise.all(
            questionResult.rows.map(async (q) => {
                const optionsResult = await pool.query(
                    'SELECT text, type FROM options WHERE question_id = $1',
                    [q.id]
                );

                return {
                    id: q.id,
                    category: q.category,
                    question: q.question,
                    options: optionsResult.rows
                };
            })
        );

        res.status(200).json(questionsWithOptions);
    } catch (error) {
        console.error(error);
        res.status(500).send(`(서버 에러) ${error.message}`);
    }
});

router.post('/by_ids', async (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).send('질문 ID 배열이 필요합니다.');
    }

    try {
        const questionResult = await pool.query(
            'SELECT * FROM questions WHERE id = ANY($1)',
            [ids]
        );

        const questionsWithOptions = await Promise.all(
            questionResult.rows.map(async (q) => {
                const optionsResult = await pool.query(
                    'SELECT text, type FROM options WHERE question_id = $1',
                    [q.id]
                );

                return {
                    id: q.id,
                    category: q.category,
                    question: q.question,
                    options: optionsResult.rows
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
