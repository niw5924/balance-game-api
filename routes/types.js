const express = require('express');
const router = express.Router();

// 유형 데이터
const types = [
    "감성형", "이성형", "모험형", "회피형", "자기중심형",
    "공감형", "돌직구형", "이상주의형", "현실주의형", "낭만형",
    "도전형", "관찰자형", "쾌락추구형", "신중형", "충동형",
    "자기희생형", "호기심형", "분석형", "기피형", "전통중시형"
];

// GET /api/types
router.get('/', (req, res) => {
    res.json(types);
});

module.exports = router;
