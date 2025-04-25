# 이저도감 백엔드 API

이 프로젝트는 **Node.js 기반의 이저도감 API 서버**입니다.  
**PostgreSQL**과 연동되어 퀴즈 문제 및 사용자 데이터를 저장합니다.

---

## 📡 API 주소 목록 (AWS EC2 사용)

### 질문 목록 요청  
`GET http://15.164.99.183:3000/api/questions`

### 유형 목록 요청  
`GET http://15.164.99.183:3000/api/types`

### 사용자 게임 결과 제출  
`POST http://15.164.99.183:3000/api/submit_play_result`

- 사용자가 게임을 완료하고 "저장하기"를 눌렀을 때 호출되는 API입니다.
- 내부적으로 다음 두 함수가 호출됩니다:
  - `services/user_play_records.js`: `saveUserPlayRecord()` 함수 호출
  - `services/user_type_counts.js`: `updateUserTypeCounts()` 함수 호출
- 5분 이내 동일한 선택값을 다시 제출하는 경우, 중복으로 간주되어 저장되지 않습니다.

### 사용자 타입 카운트 조회  
`GET http://15.164.99.183:3000/api/user_type_counts/:user_id`

### 사용자 플레이 기록 조회  
`GET http://15.164.99.183:3000/api/user_play_records/:user_id`

### 사용자 데이터 삭제  
`POST http://15.164.99.183:3000/api/delete_user_data`
