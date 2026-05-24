'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { questions, TOTAL_QUESTIONS } from '@/lib/questions';

export default function DiagnosisPage() {
  const router = useRouter();
  const params = useParams();
  const questionNo = parseInt(params.questionNo as string);
  
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [currentAnswer, setCurrentAnswer] = useState<any>('');
  const [multipleAnswers, setMultipleAnswers] = useState<number[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('zenya_answers');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed);
      const existing = parsed[questionNo];
      if (Array.isArray(existing)) {
        setMultipleAnswers(existing);
        setCurrentAnswer('');
      } else if (existing !== undefined) {
        setCurrentAnswer(existing);
        setMultipleAnswers([]);
      } else {
        setCurrentAnswer('');
        setMultipleAnswers([]);
      }
    }
  }, [questionNo]);

  const question = questions.find(q => q.id === questionNo);
  
  if (!question) {
    return (
      <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl mb-4">잘못된 질문 번호입니다</h1>
          <button onClick={() => router.push('/')} className="text-cyan-400 hover:underline">
            처음으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  const saveAndNext = () => {
    let answerToSave;
    if (question.type === 'multiple') {
      answerToSave = multipleAnswers;
    } else {
      answerToSave = currentAnswer;
    }
    
    const updated = { ...answers, [questionNo]: answerToSave };
    sessionStorage.setItem('zenya_answers', JSON.stringify(updated));
    
    if (questionNo >= TOTAL_QUESTIONS) {
      router.push('/result');
    } else {
      router.push(`/diagnosis/${questionNo + 1}`);
    }
  };

  const goPrev = () => {
    if (questionNo > 1) {
      router.push(`/diagnosis/${questionNo - 1}`);
    } else {
      router.push('/');
    }
  };

  const toggleMultiple = (idx: number) => {
    if (multipleAnswers.includes(idx)) {
      setMultipleAnswers(multipleAnswers.filter(i => i !== idx));
    } else {
      if (question.maxSelect && multipleAnswers.length >= question.maxSelect) {
        return;
      }
      setMultipleAnswers([...multipleAnswers, idx]);
    }
  };

  const canProceed = () => {
    if (question.optional) return true;
    if (question.type === 'multiple') return multipleAnswers.length > 0;
    return currentAnswer !== '' && currentAnswer !== undefined && currentAnswer !== null;
  };

  const progress = (questionNo / TOTAL_QUESTIONS) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-2xl mx-auto pt-8">
        
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>{question.section}</span>
            <span>{questionNo} / {TOTAL_QUESTIONS} ({Math.round(progress)}%)</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Q{questionNo}. {question.title}
            {question.optional && <span className="text-sm text-slate-400 ml-2">(선택)</span>}
            {question.maxSelect && <span className="text-sm text-slate-400 ml-2">(최대 {question.maxSelect}개)</span>}
          </h2>
          
          {question.helpText && (
            <p className="text-sm text-cyan-300 mb-6 italic">{question.helpText}</p>
          )}

          <div className={question.helpText ? '' : 'mt-6'}>
            {/* Text Input */}
            {(question.type === 'text' || question.type === 'number') && (
              <input
                type={question.type === 'number' ? 'number' : 'text'}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder={question.placeholder}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white text-lg focus:border-cyan-500 focus:outline-none"
                autoFocus
              />
            )}

            {/* Single Choice */}
            {question.type === 'single' && question.options && (
              <div className="space-y-3">
                {question.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentAnswer(idx)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      currentAnswer === idx
                        ? 'bg-cyan-500/20 border-cyan-500 text-white'
                        : 'bg-slate-900 border-slate-600 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span className="mr-2 text-cyan-400">{currentAnswer === idx ? '●' : '○'}</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Multiple Choice */}
            {question.type === 'multiple' && question.options && (
              <div className="space-y-3">
                {question.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleMultiple(idx)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      multipleAnswers.includes(idx)
                        ? 'bg-cyan-500/20 border-cyan-500 text-white'
                        : 'bg-slate-900 border-slate-600 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span className="mr-2 text-cyan-400">{multipleAnswers.includes(idx) ? '☑' : '☐'}</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Scale 1-5 */}
            {question.type === 'scale' && (
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCurrentAnswer(n)}
                    className={`flex-1 py-4 rounded-lg border text-xl font-bold transition-all ${
                      currentAnswer === n
                        ? 'bg-cyan-500/20 border-cyan-500 text-white'
                        : 'bg-slate-900 border-slate-600 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={goPrev}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-all"
          >
            ← 이전
          </button>
          
          <button
            onClick={saveAndNext}
            disabled={!canProceed()}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {questionNo >= TOTAL_QUESTIONS ? '완료 →' : '다음 →'}
          </button>
        </div>
      </div>
    </main>
  );
}
