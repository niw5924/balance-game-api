const express = require('express');
const router = express.Router();

// 질문 데이터
const questions = [
  {
    category: "19금",
    question: "연인과의 스킨십 빈도 중 선호하는 것은?",
    options: [
      { text: "매일 1분 스킨십", type: "쾌락추구형" },
      { text: "일주일에 한 번 1시간 스킨십", type: "신중형" }
    ]
  },
  {
    category: "19금",
    question: "관계 시 조명 상태를 선택한다면?",
    options: [
      { text: "불 끄고 하기", type: "감성형" },
      { text: "불 켜고 하기", type: "돌직구형" }
    ]
  },
  {
    category: "19금",
    question: "관계를 맺을 장소를 고른다면?",
    options: [
      { text: "낯선 장소에서 하기", type: "모험형" },
      { text: "익숙한 내 방에서 하기", type: "전통중시형" }
    ]
  },
  {
    category: "19금",
    question: "연인과 첫 관계의 타이밍은?",
    options: [
      { text: "첫날에 하기", type: "충동형" },
      { text: "100일 후에 하기", type: "이상주의형" }
    ]
  },
  {
    category: "19금",
    question: "연인의 애정 표현 방식 중 선호하는 것은?",
    options: [
      { text: "은근하게 표현하는 애인", type: "관찰자형" },
      { text: "노골적으로 표현하는 애인", type: "돌직구형" }
    ]
  },
  {
    category: "19금",
    question: "연인이 갑작스럽게 다가올 때의 반응은?",
    options: [
      { text: "갑자기 키스하기", type: "충동형" },
      { text: "손 잡고 눈 바라보기", type: "감성형" }
    ]
  },
  {
    category: "19금",
    question: "이상적인 리드 방식은?",
    options: [
      { text: "서로 리드하는 관계", type: "공감형" },
      { text: "한 사람이 주도하는 관계", type: "자기중심형" }
    ]
  },
  {
    category: "19금",
    question: "과거 연애 이야기에 대한 당신의 태도는?",
    options: [
      { text: "솔직하게 공유한다", type: "이성형" },
      { text: "절대 비밀로 한다", type: "기피형" }
    ]
  },
  {
    category: "19금",
    question: "관계 도중 예상치 못한 웃긴 상황이 생긴다면?",
    options: [
      { text: "웃고 넘긴다", type: "낭만형" },
      { text: "진지하게 분위기 유지한다", type: "신중형" }
    ]
  },
  {
    category: "19금",
    question: "관계가 끝난 후의 당신은?",
    options: [
      { text: "바로 잠든다", type: "자기중심형" },
      { text: "대화를 나눈다", type: "공감형" }
    ]
  }
];

// GET /api/questions
router.get('/', (req, res) => {
  res.json(questions);
});

module.exports = router;
