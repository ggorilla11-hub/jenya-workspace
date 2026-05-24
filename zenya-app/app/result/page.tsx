'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';

export default function ResultPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, any>>({});

  useEffect(() => {
    const saved = sessionStorage.getItem('zenya_answers');
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);

  // 페르소나 자동 분류
  const getPersona = () => {
    const job = answers[6];
    if (job === undefined) return '분석 중...';
    const personas = [
      '신입 보험설계사',
      '일반 보험설계사',
      '중견 보험설계사',
      '중간 관리자',
      'GA 대표/본부장',
      '법인·기업성 전문 FC',
      '겸업형',
      '오상열 대표 (1인사업자)',
      '기타'
    ];
    return personas[job] || '기타';
  };

  // 활성 에이전트 계산
  const getAgents = () => {
    const L1 = ['비서실장', '업적관리', '마케팅', '법무', '디자인', '운영', '학습'];
    const L2 = ['고객발굴', '상담지원', '고객관리', '보상처리', '가입설계서', '제안서', '활동실적'];
    
    const job = answers[6];
    const isInsurance = [0,1,2,5,6].includes(job);
    if (isInsurance) {
      L2.push('금융집짓기®진단', 'DESIRE알고리즘');
    }
    
    const L3: string[] = [];
    if (job === 3 || job === 4) L3.push('조직관리', '리쿠르팅', '신입케어');
    if (job === 5) L3.push('법인·기업성');
    if (job === 6) L3.push('세무', '매장운영');
    if (job === 7) L3.push('콘텐츠자동화', '개발팀');
    
    return { L1, L2, L3 };
  };

  const agents = getAgents();
  const totalAgents = agents.L1.length + agents.L2.length + agents.L3.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-3xl mx-auto pt-8 space-y-8">
        
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold mb-2">분석 완료!</h1>
          <p className="text-slate-300">당신만의 지니야가 조립되었습니다</p>
        </div>

        {/* 페르소나 */}
        <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-2xl p-6">
          <div className="text-sm text-purple-300 mb-2">📊 당신의 페르소나</div>
          <div className="text-3xl font-bold">{getPersona()}</div>
          <div className="text-slate-300 mt-2">활성 에이전트: {totalAgents}개</div>
        </div>

        {/* 영원한 북극성 */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
          <div className="text-sm text-yellow-300 mb-3">🌟 영원한 북극성 (평생 기억됩니다)</div>
          <div className="space-y-2 text-sm">
            <div><span className="text-yellow-200">단기 목표:</span> {answers[34] || '미입력'}</div>
            <div><span className="text-yellow-200">중기 목표:</span> {answers[35] || '미입력'}</div>
            <div><span className="text-yellow-200">장기 목표:</span> {answers[36] || '미입력'}</div>
            <div className="pt-2 border-t border-yellow-500/20 mt-3">
              <div><span className="text-yellow-200">일일 발굴:</span> {answers[37] || '미입력'}</div>
              <div><span className="text-yellow-200">월 계약:</span> {answers[38] || '미입력'}</div>
              <div><span className="text-yellow-200">월 보험료:</span> {answers[39] || '미입력'}</div>
            </div>
          </div>
        </div>

        {/* 활성 에이전트 */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
          <div className="text-sm text-cyan-300 mb-4">🤖 활성 에이전트 ({totalAgents}개)</div>
          
          <div className="mb-4">
            <div className="text-xs text-slate-400 mb-2">L1 공통 ({agents.L1.length})</div>
            <div className="flex flex-wrap gap-2">
              {agents.L1.map((name, i) => (
                <span key={i} className="bg-slate-700/50 border border-slate-600 px-3 py-1 rounded-full text-xs">{name}</span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-slate-400 mb-2">L2 직무 ({agents.L2.length})</div>
            <div className="flex flex-wrap gap-2">
              {agents.L2.map((name, i) => (
                <span key={i} className="bg-emerald-900/30 border border-emerald-700/50 px-3 py-1 rounded-full text-xs">{name}</span>
              ))}
            </div>
          </div>

          {agents.L3.length > 0 && (
            <div>
              <div className="text-xs text-slate-400 mb-2">L3 동적 ({agents.L3.length})</div>
              <div className="flex flex-wrap gap-2">
                {agents.L3.map((name, i) => (
                  <span key={i} className="bg-purple-900/30 border border-purple-700/50 px-3 py-1 rounded-full text-xs">{name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 지니야 서약 */}
        <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl p-6 text-center">
          <p className="text-lg italic text-slate-200">
            "이 목표는 이제부터 당신의 것이 아니라<br/>
            <strong className="text-yellow-300">우리 둘의 목표</strong>입니다.<br/>
            24시간, 7일, 365일, 평생 함께합니다."
          </p>
          <p className="text-sm text-slate-400 mt-3">— 당신의 지니야</p>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => alert('지니야 1호 조립 시작! (다음 PHASE에서 구현)')}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-200 hover:-translate-y-1"
          >
            지니야 1호 조립 시작 →
          </button>
        </div>

      </div>
    </main>
  );
}
