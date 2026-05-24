export type QuestionType = 'text' | 'single' | 'multiple' | 'scale' | 'number';

export interface Question {
  id: number;
  section: string;
  title: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  maxSelect?: number;
  optional?: boolean;
  helpText?: string;
}

export const questions: Question[] = [
  // SECTION A. 기본 정보 (5)
  { id: 1, section: 'A. 기본 정보', title: '성함을 알려주세요', type: 'text', placeholder: '예: 오상열' },
  { id: 2, section: 'A. 기본 정보', title: '나이는 어떻게 되세요?', type: 'single', options: ['20-30대', '40대', '50대', '60대 이상'] },
  { id: 3, section: 'A. 기본 정보', title: '거주 지역은 어디세요?', type: 'single', options: ['수도권 (서울·경기·인천)', '광역시', '지방 도시', '그 외'] },
  { id: 4, section: 'A. 기본 정보', title: '카톡으로 연락받을 번호는요?', type: 'text', placeholder: '010-0000-0000' },
  { id: 5, section: 'A. 기본 정보', title: 'Google 계정 이메일은요?', type: 'text', placeholder: 'example@gmail.com' },
  
  // SECTION B. 직업·경력 (8)
  { id: 6, section: 'B. 직업·경력', title: '어떤 일을 하시나요?', type: 'single', 
    helpText: '⭐ 이 답변이 지니야의 페르소나를 결정합니다',
    options: [
      '신입 보험설계사 (1년 미만)',
      '일반 보험설계사 (1-10년)',
      '중견 보험설계사 (10년+)',
      '중간 관리자 (영업+관리)',
      'GA 대표/본부장',
      '법인·기업성 전문 FC',
      '겸업형 (보험+다른 사업)',
      '1인사업자·교육자·강사',
      '기타'
    ]},
  { id: 7, section: 'B. 직업·경력', title: '보험업 경력은 몇 년이세요?', type: 'single',
    helpText: '보험설계사가 아니면 "비해당" 선택',
    options: ['1년 미만', '1-3년', '3-10년', '10년 이상', '비해당'] },
  { id: 8, section: 'B. 직업·경력', title: '주력 상품은? (최대 3개)', type: 'multiple', maxSelect: 3,
    helpText: '보험설계사가 아니면 "비해당" 선택',
    options: ['생명보험', '손해보험', '변액보험', '법인보험·기업성', '종합', '비해당'] },
  { id: 9, section: 'B. 직업·경력', title: '소속은 어디세요?', type: 'single', 
    options: ['GA (보험대리점)', '원수사 (보험회사 직속)', '법인대리점', '1인 사업자', '기타'] },
  { id: 10, section: 'B. 직업·경력', title: '현재 관리 고객 수는?', type: 'number', placeholder: '예: 297 (없으면 0)' },
  { id: 11, section: 'B. 직업·경력', title: '월 평균 신규 계약 건수는?', type: 'single', 
    helpText: '보험설계사가 아니면 "비해당" 선택',
    options: ['1건 이하', '2-3건', '4-7건', '8-15건', '15건 이상', '비해당'] },
  { id: 12, section: 'B. 직업·경력', title: '하루 평균 전화 통화 수는?', type: 'single', options: ['0통화', '1-3통화', '4-10통화', '10-20통화', '20통화 이상'] },
  { id: 13, section: 'B. 직업·경력', title: '월 평균 수입은? (선택사항)', type: 'single', optional: true,
    options: ['200만 미만', '200-500만', '500-1,000만', '1,000-3,000만', '3,000만 이상', '비공개'] },
  
  // SECTION C. 강점·약점 (7)
  { id: 14, section: 'C. 강점·약점', title: '본인의 영업·소통 스타일은?', type: 'single', options: ['관계형 (오래 친해진 후)', '전문가형 (분석·자료)', '속도형 (빠른 결정)', '혼합형'] },
  { id: 15, section: 'C. 강점·약점', title: '디지털 도구 활용 수준은? (1=초보, 5=전문가)', type: 'scale' },
  { id: 16, section: 'C. 강점·약점', title: '글쓰기 자신감은? (블로그·SNS)', type: 'single', options: ['매우 자신 있음', '보통', '자신 없음', '시간만 있으면 가능'] },
  { id: 17, section: 'C. 강점·약점', title: '자료 만들기 자신감은?', type: 'single', options: ['매우 자신 있음', '보통', '자신 없음', '시간만 있으면 가능'] },
  { id: 18, section: 'C. 강점·약점', title: '고객 카톡 응답 평균 속도는?', type: 'single', options: ['즉시 (10분 내)', '빠름 (1시간 내)', '보통 (당일 내)', '늦음 (다음날)'] },
  { id: 19, section: 'C. 강점·약점', title: '야간·주말 응대 가능?', type: 'single', options: ['24시간 언제든', '평일 야간만', '주말 낮만', '평일 낮만'] },
  { id: 20, section: 'C. 강점·약점', title: '본인 자기관리 시간 확보?', type: 'single', options: ['충분 (주 10시간+)', '보통 (주 5시간)', '부족 (주 2시간)', '거의 없음'] },
  
  // SECTION D. 페인포인트 (7)
  { id: 21, section: 'D. 페인포인트', title: '지금 가장 시간이 부족한 업무는? (최대 3개)', type: 'multiple', maxSelect: 3, options: [
    '고객 발굴·소개 요청',
    '기존 고객 관리',
    '가입 설계서 작성',
    '제안서 작성',
    '보상·청구 처리',
    '약관 분석·비교',
    '콘텐츠 작성 (블로그·SNS)',
    '마케팅·홍보 (광고·캠페인)',
    '영상·쇼츠 제작',
    '일정·이메일 관리',
    '세무·회계',
    '조직 관리·후배 코칭',
    '리쿠르팅',
    '기타'
  ]},
  { id: 22, section: 'D. 페인포인트', title: '가장 스트레스 받는 업무는? (최대 2개)', type: 'multiple', maxSelect: 2, options: [
    '콜드 아웃리치',
    '거절·이탈 대응',
    '민원·환수 대응',
    '마감 압박',
    '사무 행정',
    '조직 관리·인간관계',
    '새 상품·법 개정 학습',
    '자료·서류 작성',
    '마케팅·홍보',
    '기타'
  ]},
  { id: 23, section: 'D. 페인포인트', title: '현재 고객발굴 주요 형태는? (최대 3개)', type: 'multiple', maxSelect: 3, options: [
    '지인 (친구·가족·동창)',
    '기존 고객 추가 발굴',
    '소개',
    'DB (구매 명단·콜드콜)',
    '온라인 (블로그·YouTube·SNS)',
    '세미나·강의',
    '오프라인 행사·박람회',
    'AI앱 트로이목마',
    '기타'
  ]},
  { id: 24, section: 'D. 페인포인트', title: 'AI가 가장 먼저 해주길 원하는 일은?', type: 'single', options: [
    '잠재고객 발굴 (소셜리스닝)',
    '기존 고객 관리 자동화',
    '설계서·제안서 자동 작성',
    '보상 처리·약관 분석',
    '콘텐츠·마케팅 자동화',
    '영상·쇼츠 자동 제작',
    '일정·이메일 비서',
    '본인 학습·코칭',
    '기타'
  ]},
  { id: 25, section: 'D. 페인포인트', title: '가장 자동화하고 싶은 반복 업무는?', type: 'text', placeholder: '예: 매일 갱신·생일·기념일 챙기는 것' },
  { id: 26, section: 'D. 페인포인트', title: 'AI가 절대 하면 안 되는 영역은?', type: 'single', options: [
    '최종 고객 상담·계약 체결',
    '가족·VIP 고객 직접 응대',
    '법적 책임 따르는 결정',
    '본인의 평판·인격 관련 발언',
    '가격·할인 결정',
    '없음 (AI 자율)',
    '기타'
  ]},
  { id: 27, section: 'D. 페인포인트', title: '고객에게 AI 사용 사실을 공개?', type: 'single', options: ['공개', '부분 공개', '비공개', '모르겠음'] },
  
  // SECTION E. 도구·역량 (4)
  { id: 28, section: 'E. 도구·역량', title: '현재 사용 중인 디지털 도구는?', type: 'multiple', options: [
    '카카오톡 채널',
    '네이버 블로그',
    'YouTube·인스타·틱톡',
    'Google Workspace',
    '보험사 CRM',
    '본인 자체 엑셀·노트',
    'ChatGPT·Claude 등 AI',
    '거의 없음'
  ]},
  { id: 29, section: 'E. 도구·역량', title: '카카오톡 채널 보유?', type: 'single', options: ['있음 + 운영 중', '있음 + 방치', '없음 + 만들 의향', '없음 + 필요성 모름'] },
  { id: 30, section: 'E. 도구·역량', title: '본인 콘텐츠 자산?', type: 'multiple', options: ['YouTube 채널', '블로그·티스토리', 'SNS', '책·전자책', '강의·세미나', '팟캐스트', '없음'] },
  { id: 31, section: 'E. 도구·역량', title: '영상·음성 콘텐츠 제작 의향?', type: 'single', options: ['매우 적극 (직접 촬영)', '보통 (AI 도움 필요)', '소극 (글로만)', '안 함'] },
  
  // SECTION F. 금융집짓기·DESIRE (2) - 비해당 옵션 추가
  { id: 32, section: 'F. 금융집짓기®·DESIRE', title: '금융집짓기® 강의를 들으신 적이?', type: 'single',
    helpText: '보험설계사가 아니면 "비해당" 선택',
    options: ['들었음 + 마스터함', '들었음 + 입문 수준', '들어본 적 있음', '안 들었음', '비해당'] },
  { id: 33, section: 'F. 금융집짓기®·DESIRE', title: 'DESIRE 6단계를 알고 계세요?', type: 'single',
    helpText: '보험설계사가 아니면 "비해당" 선택',
    options: ['알고 활용 중', '들어봤음', '모름', '비해당'] },
  
  // SECTION G. 영원한 북극성 (6)
  { id: 34, section: 'G. 영원한 북극성', title: '🎯 단기 목표 (이번달)', type: 'text',
    helpText: '⭐ 평생 기억됩니다',
    placeholder: '예: 신계약 3건 / 매출 800만' },
  { id: 35, section: 'G. 영원한 북극성', title: '🎯 중기 목표 (3-6개월)', type: 'text', placeholder: '예: MDRT 자격 / 297명 디지털화' },
  { id: 36, section: 'G. 영원한 북극성', title: '🎯 장기 목표 (1-3년)', type: 'text', placeholder: '예: 본부장 승급 / 월 매출 3,000만' },
  { id: 37, section: 'G. 영원한 북극성', title: '🎯 핵심 KPI - 일일 발굴 목표', type: 'text', placeholder: '예: 하루 5명 발굴' },
  { id: 38, section: 'G. 영원한 북극성', title: '🎯 핵심 KPI - 월 계약 건수 목표', type: 'text', placeholder: '예: 월 5건' },
  { id: 39, section: 'G. 영원한 북극성', title: '🎯 핵심 KPI - 월 보험료 목표', type: 'text', placeholder: '예: 월 2,000만원' },
  
  // SECTION H. BEFORE/AFTER (1) - 단순화
  { id: 40, section: 'H. BEFORE/AFTER', title: '현재 가장 시간이 부족한 영역은? (1개)', type: 'single', options: [
    '발굴·영업 시간',
    '고객 관리 시간',
    '자료·서류 작성 시간',
    '학습·자기개발 시간',
    '휴식·가족 시간',
    '균형 잘 잡힘'
  ]},
];

export const TOTAL_QUESTIONS = questions.length;
