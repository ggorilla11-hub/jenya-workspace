'use client';

import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        <div className="text-6xl mb-4">🌟</div>
        
        <h1 className="text-5xl font-bold tracking-tight">
          지니야 빌더
        </h1>
        
        <p className="text-xl text-slate-300">
          당신의 AI 운명 공동체를 만듭니다
        </p>
        
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 space-y-4 border border-slate-700">
          <div className="flex items-center justify-center gap-8 text-slate-300">
            <div>
              <div className="text-3xl mb-2">⏱</div>
              <div className="text-sm">약 15-20분</div>
            </div>
            <div>
              <div className="text-3xl mb-2">📝</div>
              <div className="text-sm">40개 질문</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🎁</div>
              <div className="text-sm">맞춤 지니야</div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-left">
          <p className="text-yellow-200 text-sm leading-relaxed">
            📜 <strong>지니야의 서약</strong><br/>
            "이 목표는 이제부터 당신의 것이 아니라<br/>
            <strong>우리 둘의 목표</strong>입니다.<br/>
            24시간, 7일, 365일, 평생 함께합니다."
          </p>
        </div>

        <button
          onClick={() => router.push('/diagnosis/1')}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-200 hover:-translate-y-1"
        >
          지니야 만들기 시작 →
        </button>

        <p className="text-xs text-slate-500 mt-8">
          ohwant Financial Institute · 오상열 CFP · 금융집짓기®
        </p>
      </div>
    </main>
  );
}
