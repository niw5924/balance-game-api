# 이저도감 백엔드 API

이 프로젝트는 **Node.js 기반의 이저도감 API 서버**입니다.  
**PostgreSQL**과 연동되어 퀴즈 문제 및 사용자 데이터를 저장합니다.

## 📡 API 주소 목록 (로컬 테스트용)

- 질문 목록 요청  
  `http://localhost:3000/api/questions`

- 유형 목록 요청  
  `http://localhost:3000/api/types`

- 사용자 게임 결과 제출 (POST)  
  `http://localhost:3000/api/submit_play_result`

  - 사용자가 게임을 완료하고 "저장하기"를 눌렀을 때 호출되는 API입니다.  
  - 내부적으로 두 가지 기능을 수행합니다:
    1. `user_play_records` 테이블에 사용자의 선택 결과 저장  
    2. `user_type_counts` 테이블에 선택된 유형(type) 별 count 누적
  - 동일한 선택값이 5분 이내에 다시 제출되는 경우 중복으로 간주되어 저장되지 않습니다.
  - 내부적으로 다음 두 개의 서비스 함수를 사용합니다:
    - `services/saveUserPlayRecord.js`: 사용자 선택 기록 저장
    - `services/updateUserTypeCounts.js`: 유형별 count 누적 또는 초기 생성
