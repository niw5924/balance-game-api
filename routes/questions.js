const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/questions?category=19금
// GET /api/questions?category=혐오
// GET /api/questions?category=극한
// GET /api/questions?category=혼란
// GET /api/questions?category=망신
router.get('/', async (req, res) => {
    const { category } = req.query;

    // category 파라미터가 없을 경우 에러 처리
    if (!category) {
        return res.status(400).send('(요청 오류) category 쿼리 파라미터가 필요합니다.');
    }

    try {
        // 선택한 카테고리의 질문 중 랜덤하게 10개 조회
        const questionResult = await pool.query(
            `
            SELECT * FROM questions
            WHERE category = $1
            ORDER BY RANDOM()
            LIMIT 10
            `,
            [category]
        );

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
